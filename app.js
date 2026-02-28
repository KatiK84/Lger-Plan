const STORAGE_KEY = "lager-plan-v1";
const DEFAULT_TASK_TYPES = [
  "Приход товара",
  "Уход товара",
  "Сбор заказа GH",
  "Сбор заказа MGH",
  "Приемка товара",
  "Инвентаризация MGH",
  "Инвентаризация GH",
  "Уборка",
  "Командировка",
  "Другие задачи",
  "Планерка",
  "Сортировка",
];

const defaultState = {
  settings: {
    menCount: 5,
    womenCount: 2,
    hoursPerDay: 9,
  },
  employees: [
    { id: id(), name: "Иван", gender: "m" },
    { id: id(), name: "Александр", gender: "m" },
    { id: id(), name: "Игорь", gender: "m" },
    { id: id(), name: "Олена", gender: "w" },
    { id: id(), name: "Денис", gender: "m" },
  ],
  taskTypes: [...DEFAULT_TASK_TYPES],
  dayTasks: [],
  weekTasks: [],
};

let state = loadState();

const refs = {
  menCount: document.getElementById("menCount"),
  womenCount: document.getElementById("womenCount"),
  hoursPerDay: document.getElementById("hoursPerDay"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),

  employeeForm: document.getElementById("employeeForm"),
  employeeName: document.getElementById("employeeName"),
  employeeGender: document.getElementById("employeeGender"),
  employeesBody: document.getElementById("employeesBody"),
  taskTypeForm: document.getElementById("taskTypeForm"),
  taskTypeName: document.getElementById("taskTypeName"),
  taskTypesBody: document.getElementById("taskTypesBody"),

  selectedDate: document.getElementById("selectedDate"),
  dayEmployeeFilter: document.getElementById("dayEmployeeFilter"),
  dayRestrictionFilter: document.getElementById("dayRestrictionFilter"),
  dayTaskForm: document.getElementById("dayTaskForm"),
  dayEmployee: document.getElementById("dayEmployee"),
  dayTaskType: document.getElementById("dayTaskType"),
  dayRestriction: document.getElementById("dayRestriction"),
  dayMinPeople: document.getElementById("dayMinPeople"),
  dayHours: document.getElementById("dayHours"),
  dayOrder: document.getElementById("dayOrder"),
  dayTasksBody: document.getElementById("dayTasksBody"),
  printEmployeePlanBtn: document.getElementById("printEmployeePlanBtn"),

  weekTaskForm: document.getElementById("weekTaskForm"),
  weekTaskType: document.getElementById("weekTaskType"),
  weekRestriction: document.getElementById("weekRestriction"),
  weekHours: document.getElementById("weekHours"),
  weekComment: document.getElementById("weekComment"),
  weekTasksBody: document.getElementById("weekTasksBody"),

  calcSummary: document.getElementById("calcSummary"),
  calcStatus: document.getElementById("calcStatus"),
};

init();

function init() {
  refs.selectedDate.value = todayIso();
  bindEvents();
  renderAll();
  registerServiceWorker();
}

function bindEvents() {
  refs.saveSettingsBtn.addEventListener("click", onSaveSettings);

  refs.employeeForm.addEventListener("submit", onAddEmployee);
  refs.employeesBody.addEventListener("click", onEmployeesTableClick);
  refs.taskTypeForm.addEventListener("submit", onAddTaskType);
  refs.taskTypesBody.addEventListener("click", onTaskTypesTableClick);

  refs.selectedDate.addEventListener("change", renderDayAndCalc);
  refs.dayEmployeeFilter.addEventListener("change", renderDayTasks);
  refs.dayRestrictionFilter.addEventListener("change", renderDayTasks);

  refs.dayTaskForm.addEventListener("submit", onAddDayTask);
  refs.dayTasksBody.addEventListener("click", onDayTasksTableClick);
  refs.printEmployeePlanBtn.addEventListener("click", onPrintEmployeePlan);

  refs.weekTaskForm.addEventListener("submit", onAddWeekTask);
  refs.weekTasksBody.addEventListener("click", onWeekTasksTableClick);
}

function onSaveSettings() {
  state.settings.menCount = toNumber(refs.menCount.value);
  state.settings.womenCount = toNumber(refs.womenCount.value);
  state.settings.hoursPerDay = toNumber(refs.hoursPerDay.value);
  persist();
  renderDayAndCalc();
}

function onAddEmployee(event) {
  event.preventDefault();
  const name = refs.employeeName.value.trim();
  if (!name) {
    return;
  }

  state.employees.push({
    id: id(),
    name,
    gender: refs.employeeGender.value,
  });

  refs.employeeForm.reset();
  persist();
  renderAll();
}

function onEmployeesTableClick(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }

  const employeeId = button.dataset.id;
  state.employees = state.employees.filter((emp) => emp.id !== employeeId);
  state.dayTasks = state.dayTasks.filter((task) => task.employeeId !== employeeId);
  persist();
  renderAll();
}

function onAddTaskType(event) {
  event.preventDefault();
  const taskTypeName = refs.taskTypeName.value.trim();
  if (!taskTypeName) {
    return;
  }

  const exists = state.taskTypes.some(
    (type) => type.toLowerCase() === taskTypeName.toLowerCase(),
  );
  if (exists) {
    window.alert("Такой тип задачи уже есть.");
    return;
  }

  state.taskTypes.push(taskTypeName);
  refs.taskTypeForm.reset();
  persist();
  renderTaskTypes();
  renderTaskTypeOptions();
}

function onTaskTypesTableClick(event) {
  const button = event.target.closest("button[data-index]");
  if (!button) {
    return;
  }

  const index = Number(button.dataset.index);
  const taskTypeName = state.taskTypes[index];
  if (!taskTypeName) {
    return;
  }

  if (isTaskTypeInUse(taskTypeName)) {
    window.alert("Нельзя удалить тип: он уже используется в задачах.");
    return;
  }

  state.taskTypes = state.taskTypes.filter((type) => type !== taskTypeName);
  persist();
  renderTaskTypes();
  renderTaskTypeOptions();
}

function onAddDayTask(event) {
  event.preventDefault();

  const employeeId = refs.dayEmployee.value;
  const taskType = refs.dayTaskType.value;
  if (!employeeId || !taskType) {
    return;
  }

  state.dayTasks.push({
    id: id(),
    date: refs.selectedDate.value,
    employeeId,
    taskType,
    restriction: refs.dayRestriction.value,
    minPeople: Math.max(1, toNumber(refs.dayMinPeople.value)),
    hours: Math.max(0, toNumber(refs.dayHours.value)),
    orderComment: refs.dayOrder.value.trim(),
  });

  refs.dayTaskForm.reset();
  refs.dayMinPeople.value = "1";
  refs.dayRestriction.value = "both";
  renderEmployeeOptions();
  renderTaskTypeOptions();

  persist();
  renderDayAndCalc();
}

function onDayTasksTableClick(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }

  const taskId = button.dataset.id;
  state.dayTasks = state.dayTasks.filter((task) => task.id !== taskId);
  persist();
  renderDayAndCalc();
}

function onAddWeekTask(event) {
  event.preventDefault();

  const taskType = refs.weekTaskType.value;
  if (!taskType) {
    return;
  }

  state.weekTasks.push({
    id: id(),
    taskType,
    restriction: refs.weekRestriction.value,
    hours: Math.max(0, toNumber(refs.weekHours.value)),
    comment: refs.weekComment.value.trim(),
  });

  refs.weekTaskForm.reset();
  refs.weekRestriction.value = "both";
  renderTaskTypeOptions();

  persist();
  renderWeekTasks();
}

function onWeekTasksTableClick(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }

  const taskId = button.dataset.id;
  state.weekTasks = state.weekTasks.filter((task) => task.id !== taskId);

  persist();
  renderWeekTasks();
}

function onPrintEmployeePlan() {
  const selectedDate = refs.selectedDate.value;
  let employeeId = refs.dayEmployeeFilter.value;

  if (employeeId === "all") {
    employeeId = refs.dayEmployee.value;
  }

  if (!employeeId) {
    window.alert("Выберите сотрудника в фильтре.");
    return;
  }

  const employee = getEmployeeById(employeeId);
  if (!employee) {
    window.alert("Сотрудник не найден.");
    return;
  }

  const rows = state.dayTasks
    .filter((task) => task.date === selectedDate && task.employeeId === employeeId)
    .map((task) => {
      const total = task.hours * task.minPeople;
      return `
        <tr>
          <td>${escapeHtml(getTaskLabel(task))}</td>
          <td>${restrictionLabel(task.restriction)}</td>
          <td>${task.minPeople}</td>
          <td>${fmt(task.hours)}</td>
          <td>${fmt(total)}</td>
          <td>${escapeHtml(task.orderComment || "-")}</td>
        </tr>
      `;
    })
    .join("");

  const win = window.open("", "_blank", "width=980,height=740");
  if (!win) {
    return;
  }

  win.document.write(`
    <!doctype html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>План: ${escapeHtml(employee.name)}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { margin-bottom: 6px; }
          p { margin: 0 0 14px; color: #555; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f3f3f3; }
        </style>
      </head>
      <body>
        <h1>План сотрудника: ${escapeHtml(employee.name)}</h1>
        <p>Дата: ${escapeHtml(selectedDate)}</p>
        <table>
          <thead>
            <tr>
              <th>Задача</th>
              <th>м/ж/оба</th>
              <th>Мин. чел</th>
              <th>Время</th>
              <th>Общее время</th>
              <th>Номер / комментарий</th>
            </tr>
          </thead>
          <tbody>${rows || "<tr><td colspan='6'>Нет задач на выбранную дату</td></tr>"}</tbody>
        </table>
      </body>
    </html>
  `);
  win.document.close();
  win.focus();
  win.print();
}

function renderAll() {
  renderSettings();
  renderEmployees();
  renderTaskTypes();
  renderEmployeeOptions();
  renderTaskTypeOptions();
  renderDayAndCalc();
  renderWeekTasks();
}

function renderSettings() {
  refs.menCount.value = state.settings.menCount;
  refs.womenCount.value = state.settings.womenCount;
  refs.hoursPerDay.value = state.settings.hoursPerDay;
}

function renderEmployees() {
  refs.employeesBody.innerHTML = state.employees
    .map(
      (employee) => `
      <tr>
        <td>${escapeHtml(employee.name)}</td>
        <td>${employee.gender === "m" ? "м" : "ж"}</td>
        <td>
          <button class="btn danger" data-id="${employee.id}" type="button">Удалить</button>
        </td>
      </tr>
    `,
    )
    .join("");
}

function renderTaskTypes() {
  refs.taskTypesBody.innerHTML = state.taskTypes
    .map(
      (taskType, index) => `
      <tr>
        <td>${escapeHtml(taskType)}</td>
        <td>
          <button class="btn danger" data-index="${index}" type="button">Удалить</button>
        </td>
      </tr>
    `,
    )
    .join("");
}

function renderEmployeeOptions() {
  const options = state.employees
    .map((employee) => `<option value="${employee.id}">${escapeHtml(employee.name)}</option>`)
    .join("");

  refs.dayEmployee.innerHTML = options;

  const currentFilter = refs.dayEmployeeFilter.value || "all";
  refs.dayEmployeeFilter.innerHTML = `<option value="all">все</option>${options}`;

  refs.dayEmployeeFilter.value = state.employees.some((e) => e.id === currentFilter)
    ? currentFilter
    : "all";
}

function renderTaskTypeOptions() {
  if (state.taskTypes.length === 0) {
    const emptyOption = "<option value=\"\">Сначала добавьте тип задачи</option>";
    refs.dayTaskType.innerHTML = emptyOption;
    refs.weekTaskType.innerHTML = emptyOption;
    return;
  }

  const options = state.taskTypes
    .map((taskType) => `<option value="${escapeHtml(taskType)}">${escapeHtml(taskType)}</option>`)
    .join("");

  refs.dayTaskType.innerHTML = options;
  refs.weekTaskType.innerHTML = options;
}

function renderDayAndCalc() {
  renderDayTasks();
  renderDayCalc();
}

function renderDayTasks() {
  const selectedDate = refs.selectedDate.value;
  const employeeFilter = refs.dayEmployeeFilter.value;
  const restrictionFilter = refs.dayRestrictionFilter.value;

  const filteredTasks = state.dayTasks
    .filter((task) => task.date === selectedDate)
    .filter((task) => (employeeFilter === "all" ? true : task.employeeId === employeeFilter))
    .filter((task) => (restrictionFilter === "all" ? true : task.restriction === restrictionFilter));

  refs.dayTasksBody.innerHTML = filteredTasks
    .map((task) => {
      const employee = getEmployeeById(task.employeeId);
      const total = task.hours * task.minPeople;
      return `
        <tr>
          <td>${escapeHtml(employee?.name || "-")}</td>
          <td>${escapeHtml(getTaskLabel(task))}</td>
          <td>${restrictionLabel(task.restriction)}</td>
          <td class="num">${task.minPeople}</td>
          <td class="num">${fmt(task.hours)}</td>
          <td class="num">${fmt(total)}</td>
          <td>${escapeHtml(task.orderComment || "-")}</td>
          <td><button class="btn danger" data-id="${task.id}" type="button">Удалить</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderWeekTasks() {
  refs.weekTasksBody.innerHTML = state.weekTasks
    .map(
      (task) => `
      <tr>
        <td>${escapeHtml(getTaskLabel(task))}</td>
        <td>${restrictionLabel(task.restriction)}</td>
        <td class="num">${fmt(task.hours)}</td>
        <td>${escapeHtml(task.comment || "-")}</td>
        <td><button class="btn danger" data-id="${task.id}" type="button">Удалить</button></td>
      </tr>
    `,
    )
    .join("");
}

function renderDayCalc() {
  const selectedDate = refs.selectedDate.value;
  const dayTasks = state.dayTasks.filter((task) => task.date === selectedDate);

  const menCapacity = state.settings.menCount * state.settings.hoursPerDay;
  const womenCapacity = state.settings.womenCount * state.settings.hoursPerDay;

  const menOnly = sumLoad(dayTasks, "m");
  const womenOnly = sumLoad(dayTasks, "w");
  const bothReq = sumLoad(dayTasks, "both");

  const menFreeBeforeBoth = menCapacity - menOnly;
  const womenFreeBeforeBoth = womenCapacity - womenOnly;

  const usedWomenForBoth = Math.max(0, Math.min(womenFreeBeforeBoth, bothReq));
  let bothLeft = bothReq - usedWomenForBoth;

  const usedMenForBoth = Math.max(0, Math.min(menFreeBeforeBoth, bothLeft));
  bothLeft -= usedMenForBoth;

  const menRemain = menFreeBeforeBoth - usedMenForBoth;
  const womenRemain = womenFreeBeforeBoth - usedWomenForBoth;

  refs.calcSummary.innerHTML = [
    summaryItem("Мужские часы (доступно)", fmt(menCapacity)),
    summaryItem("Женские часы (доступно)", fmt(womenCapacity)),
    summaryItem("Задачи 'оба' (требуется)", fmt(bothReq)),
    summaryItem("Только мужские задачи", fmt(menOnly)),
    summaryItem("Только женские задачи", fmt(womenOnly)),
    summaryItem("Остаток мужских часов", fmt(menRemain)),
    summaryItem("Остаток женских часов", fmt(womenRemain)),
    summaryItem("Из 'оба' покрыто женскими", fmt(usedWomenForBoth)),
    summaryItem("Из 'оба' покрыто мужскими", fmt(usedMenForBoth)),
  ].join("");

  const messages = [];
  if (menOnly > menCapacity) {
    messages.push(`Не хватает мужских часов: ${fmt(menOnly - menCapacity)}`);
  }
  if (womenOnly > womenCapacity) {
    messages.push(`Не хватает женских часов: ${fmt(womenOnly - womenCapacity)}`);
  }
  if (bothLeft > 0) {
    messages.push(`Не хватает часов для задач 'оба': ${fmt(bothLeft)}`);
  }

  if (messages.length === 0) {
    refs.calcStatus.className = "status ok";
    refs.calcStatus.textContent = "OK: загрузка покрыта.";
    return;
  }

  refs.calcStatus.className = "status warn";
  refs.calcStatus.textContent = messages.join(" | ");
}

function sumLoad(tasks, restriction) {
  return tasks
    .filter((task) => task.restriction === restriction)
    .reduce((sum, task) => sum + task.hours * task.minPeople, 0);
}

function getEmployeeById(employeeId) {
  return state.employees.find((employee) => employee.id === employeeId);
}

function summaryItem(label, value) {
  return `<div class="calc-item"><strong>${label}</strong>${value}</div>`;
}

function getTaskLabel(task) {
  return task.taskType || task.taskName || "";
}

function isTaskTypeInUse(taskTypeName) {
  const usedInDay = state.dayTasks.some((task) => getTaskLabel(task) === taskTypeName);
  const usedInWeek = state.weekTasks.some((task) => getTaskLabel(task) === taskTypeName);
  return usedInDay || usedInWeek;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return structuredClone(defaultState);
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      settings: {
        menCount: toNumber(parsed?.settings?.menCount ?? defaultState.settings.menCount),
        womenCount: toNumber(parsed?.settings?.womenCount ?? defaultState.settings.womenCount),
        hoursPerDay: toNumber(parsed?.settings?.hoursPerDay ?? defaultState.settings.hoursPerDay),
      },
      employees: Array.isArray(parsed?.employees) ? parsed.employees : [],
      taskTypes: Array.isArray(parsed?.taskTypes) && parsed.taskTypes.length > 0
        ? parsed.taskTypes
        : [...DEFAULT_TASK_TYPES],
      dayTasks: Array.isArray(parsed?.dayTasks) ? parsed.dayTasks : [],
      weekTasks: Array.isArray(parsed?.weekTasks) ? parsed.weekTasks : [],
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (window.location.protocol !== "https:" && !isLocalhost) {
    return;
  }

  navigator.serviceWorker.register("service-worker.js").catch(() => {
    // Ignore failed registration on unsupported environments.
  });
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function fmt(value) {
  return Number(value).toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function restrictionLabel(code) {
  if (code === "m") return "м";
  if (code === "w") return "ж";
  return "оба";
}

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function id() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
