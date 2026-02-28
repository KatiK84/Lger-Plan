const STORAGE_KEY = "lager-plan-v1";
const WORK_DAYS_PER_WEEK = 5;
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
const HOUR_OPTIONS = [
  { value: "0.25", label: "15 мин" },
  { value: "0.5", label: "30 мин" },
  { value: "0.75", label: "45 мин" },
  { value: "1", label: "1 час" },
  { value: "1.5", label: "1,5 часа" },
  { value: "2", label: "2 часа" },
  { value: "3", label: "3 часа" },
  { value: "4", label: "4 часа" },
  { value: "5", label: "5 часов" },
  { value: "6", label: "6 часов" },
  { value: "7", label: "7 часов" },
  { value: "8", label: "8 часов" },
  { value: "9", label: "9 часов" },
];

const defaultState = {
  settings: {
    staffCount: 7,
    hoursPerDay: 9,
  },
  employees: [
    { id: id(), name: "Иван" },
    { id: id(), name: "Александр" },
    { id: id(), name: "Игорь" },
    { id: id(), name: "Олена" },
    { id: id(), name: "Денис" },
  ],
  taskTypes: [...DEFAULT_TASK_TYPES],
  dayTasks: [],
  weekTasks: [],
};

let state = loadState();

const refs = {
  staffCount: document.getElementById("staffCount"),
  hoursPerDay: document.getElementById("hoursPerDay"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),

  employeeForm: document.getElementById("employeeForm"),
  employeeName: document.getElementById("employeeName"),
  employeesBody: document.getElementById("employeesBody"),

  taskTypeForm: document.getElementById("taskTypeForm"),
  taskTypeName: document.getElementById("taskTypeName"),
  taskTypesBody: document.getElementById("taskTypesBody"),

  selectedDate: document.getElementById("selectedDate"),
  dayEmployeeFilter: document.getElementById("dayEmployeeFilter"),
  dayTaskTypeFilter: document.getElementById("dayTaskTypeFilter"),
  dayTaskForm: document.getElementById("dayTaskForm"),
  dayEmployee: document.getElementById("dayEmployee"),
  dayTaskType: document.getElementById("dayTaskType"),
  dayHours: document.getElementById("dayHours"),
  dayOrder: document.getElementById("dayOrder"),
  dayTasksBody: document.getElementById("dayTasksBody"),
  clearCompletedDayBtn: document.getElementById("clearCompletedDayBtn"),
  printEmployeePlanBtn: document.getElementById("printEmployeePlanBtn"),

  weekTaskForm: document.getElementById("weekTaskForm"),
  weekTaskType: document.getElementById("weekTaskType"),
  weekHours: document.getElementById("weekHours"),
  weekComment: document.getElementById("weekComment"),
  weekTasksBody: document.getElementById("weekTasksBody"),

  calcSummary: document.getElementById("calcSummary"),
  calcEmployeeFilter: document.getElementById("calcEmployeeFilter"),
  calcTaskTypeBreakdown: document.getElementById("calcTaskTypeBreakdown"),
  calcStatus: document.getElementById("calcStatus"),

  calcWeekSummary: document.getElementById("calcWeekSummary"),
  calcWeekStatus: document.getElementById("calcWeekStatus"),
};

init();

function init() {
  syncStaffCountWithEmployees();
  refs.selectedDate.value = todayIso();
  renderHourOptions();
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
  refs.dayTaskTypeFilter.addEventListener("change", renderDayTasks);
  refs.calcEmployeeFilter.addEventListener("change", renderDayCalc);

  refs.dayTaskForm.addEventListener("submit", onAddDayTask);
  refs.dayTasksBody.addEventListener("click", onDayTasksTableClick);
  refs.clearCompletedDayBtn.addEventListener("click", onClearCompletedDayTasks);
  refs.printEmployeePlanBtn.addEventListener("click", onPrintEmployeePlan);

  refs.weekTaskForm.addEventListener("submit", onAddWeekTask);
  refs.weekTasksBody.addEventListener("click", onWeekTasksTableClick);
}

function onSaveSettings() {
  state.settings.hoursPerDay = Math.max(0, toNumber(refs.hoursPerDay.value));
  persist();
  renderDayAndCalc();
  renderWeekCalc();
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
  });

  syncStaffCountWithEmployees();
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
  state.employees = state.employees.filter((employee) => employee.id !== employeeId);
  state.dayTasks = state.dayTasks.filter((task) => task.employeeId !== employeeId);
  syncStaffCountWithEmployees();
  persist();
  renderAll();
}

function onAddTaskType(event) {
  event.preventDefault();
  const taskTypeName = refs.taskTypeName.value.trim();
  if (!taskTypeName) {
    return;
  }

  const exists = state.taskTypes.some((type) => type.toLowerCase() === taskTypeName.toLowerCase());
  if (exists) {
    window.alert("Такой тип задачи уже есть.");
    return;
  }

  state.taskTypes.push(taskTypeName);
  refs.taskTypeForm.reset();
  persist();
  renderTaskTypes();
  renderTaskTypeOptions();
  renderDayAndCalc();
  renderWeekCalc();
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
  renderDayAndCalc();
  renderWeekCalc();
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
    hours: Math.max(0, toNumber(refs.dayHours.value)),
    orderComment: refs.dayOrder.value.trim(),
    completed: false,
  });

  refs.dayTaskForm.reset();
  renderEmployeeOptions();
  renderTaskTypeOptions();
  refs.dayHours.value = "1";

  persist();
  renderDayAndCalc();
}

function onDayTasksTableClick(event) {
  const button = event.target.closest("button[data-id][data-action]");
  if (!button) {
    return;
  }

  const taskId = button.dataset.id;
  const action = button.dataset.action;
  if (action === "delete") {
    state.dayTasks = state.dayTasks.filter((task) => task.id !== taskId);
  } else if (action === "toggle-complete") {
    state.dayTasks = state.dayTasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      return {
        ...task,
        completed: !task.completed,
      };
    });
  }

  persist();
  renderDayAndCalc();
}

function onClearCompletedDayTasks() {
  const selectedDate = refs.selectedDate.value;
  const completedCount = state.dayTasks.filter((task) => task.date === selectedDate && task.completed).length;
  if (completedCount === 0) {
    window.alert("На выбранную дату нет выполненных задач.");
    return;
  }

  state.dayTasks = state.dayTasks.filter((task) => !(task.date === selectedDate && task.completed));
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
    hours: Math.max(0, toNumber(refs.weekHours.value)),
    comment: refs.weekComment.value.trim(),
  });

  refs.weekTaskForm.reset();
  renderTaskTypeOptions();
  refs.weekHours.value = "1";

  persist();
  renderWeekTasks();
  renderWeekCalc();
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
  renderWeekCalc();
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
    .filter((task) => task.date === selectedDate && task.employeeId === employeeId && !task.completed)
    .map((task) => `
      <tr>
        <td>${escapeHtml(getTaskLabel(task))}</td>
        <td>${fmt(task.hours)}</td>
        <td>${escapeHtml(task.orderComment || "-")}</td>
      </tr>
    `)
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
              <th>Планируемое время</th>
              <th>Номер / комментарий</th>
            </tr>
          </thead>
          <tbody>${rows || "<tr><td colspan='3'>Нет задач на выбранную дату</td></tr>"}</tbody>
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
  renderWeekCalc();
}

function renderSettings() {
  syncStaffCountWithEmployees();
  refs.staffCount.value = state.settings.staffCount;
  refs.hoursPerDay.value = state.settings.hoursPerDay;
}

function renderEmployees() {
  refs.employeesBody.innerHTML = state.employees
    .map(
      (employee) => `
      <tr>
        <td>${escapeHtml(employee.name)}</td>
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

  const currentDayEmployee = refs.dayEmployee.value;
  const currentFilter = refs.dayEmployeeFilter.value || "all";
  const currentCalcFilter = refs.calcEmployeeFilter.value || "all";

  refs.dayEmployee.innerHTML = options;
  refs.dayEmployeeFilter.innerHTML = `<option value="all">все</option>${options}`;
  refs.calcEmployeeFilter.innerHTML = `<option value="all">все сотрудники</option>${options}`;

  if (state.employees.some((employee) => employee.id === currentDayEmployee)) {
    refs.dayEmployee.value = currentDayEmployee;
  }

  refs.dayEmployeeFilter.value = state.employees.some((employee) => employee.id === currentFilter)
    ? currentFilter
    : "all";

  refs.calcEmployeeFilter.value = state.employees.some((employee) => employee.id === currentCalcFilter)
    ? currentCalcFilter
    : "all";
}

function renderTaskTypeOptions() {
  const currentDayTaskType = refs.dayTaskType.value;
  const currentWeekTaskType = refs.weekTaskType.value;
  const currentTypeFilter = refs.dayTaskTypeFilter.value || "all";

  if (state.taskTypes.length === 0) {
    const emptyOption = "<option value=\"\">Сначала добавьте тип задачи</option>";
    refs.dayTaskType.innerHTML = emptyOption;
    refs.weekTaskType.innerHTML = emptyOption;
    refs.dayTaskTypeFilter.innerHTML = "<option value=\"all\">все</option>";
    return;
  }

  const options = state.taskTypes
    .map((taskType) => `<option value="${escapeHtml(taskType)}">${escapeHtml(taskType)}</option>`)
    .join("");

  refs.dayTaskType.innerHTML = options;
  refs.weekTaskType.innerHTML = options;
  refs.dayTaskTypeFilter.innerHTML = `<option value="all">все</option>${options}`;

  if (state.taskTypes.includes(currentDayTaskType)) {
    refs.dayTaskType.value = currentDayTaskType;
  }

  if (state.taskTypes.includes(currentWeekTaskType)) {
    refs.weekTaskType.value = currentWeekTaskType;
  }

  refs.dayTaskTypeFilter.value = state.taskTypes.includes(currentTypeFilter) ? currentTypeFilter : "all";
}

function renderHourOptions() {
  const dayCurrent = refs.dayHours.value;
  const weekCurrent = refs.weekHours.value;
  const options = HOUR_OPTIONS
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");

  refs.dayHours.innerHTML = options;
  refs.weekHours.innerHTML = options;

  refs.dayHours.value = HOUR_OPTIONS.some((option) => option.value === dayCurrent)
    ? dayCurrent
    : "1";
  refs.weekHours.value = HOUR_OPTIONS.some((option) => option.value === weekCurrent)
    ? weekCurrent
    : "1";
}

function renderDayAndCalc() {
  renderDayTasks();
  renderDayCalc();
}

function renderDayTasks() {
  const selectedDate = refs.selectedDate.value;
  const employeeFilter = refs.dayEmployeeFilter.value;
  const taskTypeFilter = refs.dayTaskTypeFilter.value;

  const filteredTasks = state.dayTasks
    .filter((task) => task.date === selectedDate)
    .filter((task) => (employeeFilter === "all" ? true : task.employeeId === employeeFilter))
    .filter((task) => (taskTypeFilter === "all" ? true : getTaskLabel(task) === taskTypeFilter));

  refs.dayTasksBody.innerHTML = filteredTasks
    .sort((a, b) => Number(a.completed) - Number(b.completed))
    .map((task) => {
      const employee = getEmployeeById(task.employeeId);
      return `
        <tr class="${task.completed ? "completed-row" : ""}">
          <td>${escapeHtml(employee?.name || "-")}</td>
          <td>${escapeHtml(getTaskLabel(task))}</td>
          <td class="num">${fmt(task.hours)}</td>
          <td>${escapeHtml(task.orderComment || "-")}</td>
          <td>
            <button class="btn ${task.completed ? "muted" : "done"}" data-id="${task.id}" data-action="toggle-complete" type="button">${task.completed ? "Вернуть" : "Готово"}</button>
            <button class="btn danger" data-id="${task.id}" data-action="delete" type="button">Удалить</button>
          </td>
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
  const dayTasks = state.dayTasks.filter((task) => task.date === selectedDate && !task.completed);
  const selectedEmployeeId = refs.calcEmployeeFilter.value;

  if (selectedEmployeeId && selectedEmployeeId !== "all") {
    const employee = getEmployeeById(selectedEmployeeId);
    const employeeName = employee?.name || "Сотрудник";
    const employeeTasks = dayTasks.filter((task) => task.employeeId === selectedEmployeeId);
    const availableHours = state.settings.hoursPerDay;
    const plannedHours = sumHours(employeeTasks);
    const diff = availableHours - plannedHours;

    refs.calcSummary.innerHTML = [
      summaryItem("Сотрудник", escapeHtml(employeeName)),
      summaryItem("Доступно часов", fmt(availableHours)),
      summaryItem("Запланировано часов", fmt(plannedHours)),
      summaryItem(diff >= 0 ? "Остаток часов" : "Перегрузка", fmt(Math.abs(diff))),
    ].join("");

    renderDailyBreakdown(employeeTasks, `Загрузка по типам задач: ${employeeName}`);

    if (plannedHours === availableHours) {
      refs.calcStatus.className = "status ok";
      refs.calcStatus.textContent = `Сотрудник ${employeeName}: полностью запланирован по часам.`;
      return;
    }

    refs.calcStatus.className = "status warn";
    refs.calcStatus.textContent = plannedHours < availableHours
      ? `Сотрудник ${employeeName}: недозагрузка ${fmt(availableHours - plannedHours)} ч.`
      : `Сотрудник ${employeeName}: перегрузка ${fmt(plannedHours - availableHours)} ч.`;
    return;
  }

  const availableHours = state.settings.staffCount * state.settings.hoursPerDay;
  const plannedHours = sumHours(dayTasks);
  const remainingHours = availableHours - plannedHours;

  refs.calcSummary.innerHTML = [
    summaryItem("Сотрудников в смене", fmt(state.settings.staffCount)),
    summaryItem("Доступно часов", fmt(availableHours)),
    summaryItem("Запланировано часов", fmt(plannedHours)),
    summaryItem(remainingHours >= 0 ? "Остаток часов" : "Дефицит часов", fmt(Math.abs(remainingHours))),
  ].join("");

  renderDailyBreakdown(dayTasks);

  if (plannedHours <= availableHours) {
    refs.calcStatus.className = "status ok";
    refs.calcStatus.textContent = "OK: доступных часов хватает на все задачи.";
    return;
  }

  refs.calcStatus.className = "status warn";
  refs.calcStatus.textContent = `Не хватает часов: ${fmt(plannedHours - availableHours)}.`;
}

function renderDailyBreakdown(dayTasks, title = "Загрузка по типам задач") {
  const grouped = groupHoursByTaskType(dayTasks);

  if (grouped.length === 0) {
    refs.calcTaskTypeBreakdown.innerHTML = "<div class=\"breakdown-empty\">На выбранную дату задач нет.</div>";
    return;
  }

  const rows = grouped
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.taskType)}</td>
        <td class="num">${fmt(item.hours)}</td>
      </tr>
    `,
    )
    .join("");

  refs.calcTaskTypeBreakdown.innerHTML = `
    <h3>${escapeHtml(title)}</h3>
    <table class="breakdown-table">
      <thead>
        <tr>
          <th>Тип задачи</th>
          <th>Планируемое время</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function renderWeekCalc() {
  const plannedWeekHours = sumHours(state.weekTasks);
  const availableWeekHours = state.settings.staffCount * state.settings.hoursPerDay * WORK_DAYS_PER_WEEK;
  const remainingWeekHours = availableWeekHours - plannedWeekHours;

  refs.calcWeekSummary.innerHTML = [
    summaryItem("Рабочих дней в неделе", fmt(WORK_DAYS_PER_WEEK)),
    summaryItem("Доступно часов за неделю", fmt(availableWeekHours)),
    summaryItem("Запланировано часов за неделю", fmt(plannedWeekHours)),
    summaryItem(remainingWeekHours >= 0 ? "Остаток часов" : "Дефицит часов", fmt(Math.abs(remainingWeekHours))),
  ].join("");

  if (plannedWeekHours <= availableWeekHours) {
    refs.calcWeekStatus.className = "status ok";
    refs.calcWeekStatus.textContent = "OK: недельная загрузка покрыта.";
    return;
  }

  refs.calcWeekStatus.className = "status warn";
  refs.calcWeekStatus.textContent = `Не хватает часов за неделю: ${fmt(plannedWeekHours - availableWeekHours)}.`;
}

function groupHoursByTaskType(tasks) {
  const map = new Map();

  for (const task of tasks) {
    const taskType = getTaskLabel(task);
    map.set(taskType, (map.get(taskType) || 0) + toNumber(task.hours));
  }

  return Array.from(map.entries())
    .map(([taskType, hours]) => ({ taskType, hours }))
    .sort((a, b) => b.hours - a.hours);
}

function sumHours(tasks) {
  return tasks.reduce((sum, task) => sum + toNumber(task.hours), 0);
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

    const hasEmployeesArray = Array.isArray(parsed?.employees);
    const parsedEmployees = hasEmployeesArray
      ? parsed.employees
          .map((employee) => ({
            id: employee?.id || id(),
            name: String(employee?.name || "").trim(),
          }))
          .filter((employee) => employee.name)
      : [];
    const employees = hasEmployeesArray ? parsedEmployees : structuredClone(defaultState.employees);

    const rawSettings = parsed?.settings || {};
    const legacyMen = toNumber(rawSettings.menCount);
    const legacyWomen = toNumber(rawSettings.womenCount);
    const legacyStaffCount = legacyMen + legacyWomen;
    const staffCount = Math.max(
      0,
      Math.floor(
        toNumber(rawSettings.staffCount) || legacyStaffCount || parsedEmployees.length || defaultState.settings.staffCount,
      ),
    );

    const taskTypes = Array.isArray(parsed?.taskTypes) && parsed.taskTypes.length > 0
      ? [...new Set(parsed.taskTypes.map((taskType) => String(taskType || "").trim()).filter(Boolean))]
      : [...DEFAULT_TASK_TYPES];

    const dayTasks = Array.isArray(parsed?.dayTasks)
      ? parsed.dayTasks.map((task) => ({
        id: task?.id || id(),
        date: task?.date || todayIso(),
        employeeId: task?.employeeId || "",
        taskType: getTaskFromRaw(task),
        hours: Math.max(0, toNumber(task?.hours)),
        orderComment: String(task?.orderComment || ""),
        completed: Boolean(task?.completed),
      }))
      : [];

    const weekTasks = Array.isArray(parsed?.weekTasks)
      ? parsed.weekTasks.map((task) => ({
        id: task?.id || id(),
        taskType: getTaskFromRaw(task),
        hours: Math.max(0, toNumber(task?.hours)),
        comment: String(task?.comment || ""),
      }))
      : [];

    return {
      settings: {
        staffCount: employees.length > 0 ? employees.length : staffCount,
        hoursPerDay: Math.max(0, toNumber(rawSettings.hoursPerDay ?? defaultState.settings.hoursPerDay)),
      },
      employees,
      taskTypes,
      dayTasks,
      weekTasks,
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function syncStaffCountWithEmployees() {
  state.settings.staffCount = state.employees.length;
}

function getTaskFromRaw(task) {
  const value = String(task?.taskType || task?.taskName || "").trim();
  return value || "Без типа";
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
