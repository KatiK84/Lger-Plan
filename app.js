const RAW_ARTICLES = `|00 Внутреннее перемещение (доход)|Поступление|Техническая операция||Отчет "Оплата по фондам" из 1С|изменил название, было: "Доход - Внутреннее перемещение"
|00 Внутреннее перемещение (расход)|Выбытие|Техническая операция||Отчет "Оплата по фондам" из 1С|изменил название, было: "Расход - Внутреннее перемещение"
|01 фонд GH|Поступление|01 Операционная деятельность|оптовые продажи GH|Отчет "Оплата по фондам" из 1С|
|01 фонд GH (возвраты)|Выбытие|01 Операционная деятельность|возврат денежных средств клиентам GH|Отчет "Оплата по фондам" из 1С|добавил/изменил статью "фонд возвратов клиентам"
|02 фонд EH|Поступление|01 Операционная деятельность|розничные продажи со всех площадок|Отчет "Оплата по фондам" из 1С|не актуальный
|02 фонд EH (возвраты)|Выбытие|01 Операционная деятельность|розничные продажи со всех площадок|Отчет "Оплата по фондам" из 1С|не актуальный
|02 фонд MGH|Поступление|01 Операционная деятельность|мелкооптовые продажи (Bstock, Jobalots, Kleinanzeigen MGH, прямые продажи клиентам, Ebay MGH)|Отчет "Оплата по фондам" из 1С|
|02 фонд MGH (возвраты)|Выбытие|01 Операционная деятельность|возврат денежных средств клиентам MGH|Отчет "Оплата по фондам" из 1С|добавил/изменил статью "фонд возвратов клиентам"
|03 Залог НДС (входящий)|Поступление|01 Операционная деятельность|Залог от покупателя, который потом возвращается покупателю|Отчет "Оплата по фондам" из 1С|изменил название, было: "Залог на НДС входящий"
|03 Залог НДС (исходящий)|Выбытие|01 Операционная деятельность|Залог от покупателя, который потом возвращается покупателю|Отчет "Оплата по фондам" из 1С|изменил название, было: "Залог на НДС исходящий"
|03 фонд Налогов (o. LohnSt. Etc.) (выбытие)|Выбытие|01 Операционная деятельность|налоги, кроме (подоходного налога - Lohnsteuer)|Отчет "Оплата по фондам" из 1С|изменил название, было: "фонд налогов (o. LohnSt. Etc.)"
|03 фонд Налогов (o. LohnSt. Etc.) (поступление)|Поступление|01 Операционная деятельность|возврат налога после перерасчета, кроме (подоходного налога - Lohnsteuer)|Отчет "Оплата по фондам" из 1С|изменил название, было: "фонд налогов (o. LohnSt. Etc.)"
|04 фонд Абонентских плат|Выбытие|01 Операционная деятельность|абонентная плата за телефон, интернет, радио, маркетплейсы, банковские комиссии|Отчет "Оплата по фондам" из 1С|изменил название, было: "фонд абонентских плат"
|04 фонд Административный (выбытие)|Выбытие|01 Операционная деятельность|представительские расходы, командировочные расходы руководящего состава и ключевого административного персонала, привлечение сторонних подрядчиков для поиска и обучения ключевого административного персонала|Отчет "Оплата по фондам" из 1С|добавил статью выбытия
|04 фонд Административный (поступление)|Поступление|01 Операционная деятельность|возврат подотчетных средств, возврат подоходного налога, возврат переплат по ЗП и соц. выплатам, возврат коммунальных платежей|Отчет "Оплата по фондам" из 1С|изменил описание
|04 фонд Непредвиденные расходы|Выбытие|01 Операционная деятельность|фонд нужен только для планирования бюджета, фактические расходы не относить|Отчет "Оплата по фондам" из 1С|изменил название и описание
|04 фонд Подрядчиков|Выбытие|01 Операционная деятельность|оплата копирайтерам, налоговым консультантам (SEK), финансовый консалтинг|Отчет "Оплата по фондам" из 1С|изменил название
|04 фонд Рекламы|Выбытие|01 Операционная деятельность|контекстная реклама, реклама на площадках|Отчет "Оплата по фондам" из 1С|изменил название
|04 фонд Страховок|Выбытие|01 Операционная деятельность|страховки, не связанные с соц. выплатами|Отчет "Оплата по фондам" из 1С|изменил название
|04 фонд Юридических услуг|Выбытие|01 Операционная деятельность|оплата услуг юристов, адвокатов и судебные издержки|Отчет "Оплата по фондам" из 1С|изменил название
|05 фонд Аренды (выбытие)|Выбытие|01 Операционная деятельность|аренда офисов, складских помещений, аренда квартир для сотрудников|Отчет "Оплата по фондам" из 1С|изменил название
|05 фонд Аренды (поступление)|Поступление|01 Операционная деятельность|возвраты по аренде и коммунальным платежам|Отчет "Оплата по фондам" из 1С|добавил статью поступления
|05 фонд АХО|Выбытие|01 Операционная деятельность|картриджи, бумага, бытовая химия, канцтовары, благоустройство территории|Отчет "Оплата по фондам" из 1С|объединил статьи
удалить|05 фонд благоустройства территории|Выбытие|01 Операционная деятельность|цветы, деревья, кусты, удобрение, декорации для двора|Отчет "Оплата по фондам" из 1С|не использовать
удалить|05 фонд жизнедеятельности офиса|Выбытие|01 Операционная деятельность|картриджи для принтеров, бумага, бытовая химия|Отчет "Оплата по фондам" из 1С|не использовать
удалить|05 фонд обновления рабочих инструментов|Выбытие|02 Инвестиционная деятельность|запасные части для сервера, кабели, манекены|Отчет "Оплата по фондам" из 1С|не использовать
|05 фонд Оборудование|Выбытие|02 Инвестиционная деятельность|мебель, офисная техника, комплектующие, запасные части для сервера|Отчет "Оплата по фондам" из 1С|изменил название и описание
|05 фонд Основные средства|Выбытие|02 Инвестиционная деятельность|покупка и ремонт дорогостоящей техники и транспорта от 850 EUR|Отчет "Оплата по фондам" из 1С|изменил название и описание
|05 фонд Ремонт (капитальный)|Выбытие|02 Инвестиционная деятельность|капитальные улучшения объектов ОС|Отчет "Оплата по фондам" из 1С|инвестиционная деятельность
|05 фонд Ремонт (текущий)|Выбытие|01 Операционная деятельность|текущий мелкий ремонт|Отчет "Оплата по фондам" из 1С|операционная деятельность
|06 фонд Корпоративных расходов|Выбытие|01 Операционная деятельность|корпоративы, подарки, мероприятия|Отчет "Оплата по фондам" из 1С|изменил название и описание
|06 фонд Найма|Выбытие|01 Операционная деятельность|расходы на поиск линейного персонала|Отчет "Оплата по фондам" из 1С|изменил название
641|06 фонд Образования|Выбытие|01 Операционная деятельность|курсы и обучающие материалы линейного персонала|Отчет "Оплата по фондам" из 1С|изменил название
поменять на 06 фонд Подрядчиков|06 фонд Провизион третьим лицам|Выбытие|01 Операционная деятельность|провизионы, комиссии, бонусы подрядчикам и посредникам|Отчет "Оплата по фондам" из 1С|изменил название
|06 ФОТ (оклад)|Выбытие|01 Операционная деятельность|оклады местным сотрудникам, соц. отчисления, Lohnsteuer|Отчет "Оплата по фондам" из 1С|разделил оклад и провизион
|06 ФОТ (провизион)|Выбытие|01 Операционная деятельность|бонусы, провизионы, премии местным сотрудникам|Отчет "Оплата по фондам" из 1С|разделил оклад и провизион
|06 ФОТ (EM оклад)|Выбытие|01 Операционная деятельность|оклады сотрудникам удаленного офиса|Отчет "Оплата по фондам" из 1С|разделил оклад и провизион
|06 ФОТ (EM провизион)|Выбытие|01 Операционная деятельность|бонусы, провизионы, премии удаленному офису|Отчет "Оплата по фондам" из 1С|разделил оклад и провизион
|07 фонд Поставщиков (выбытие)|Выбытие|01 Операционная деятельность|приобретаемый товар|Отчет "Оплата по фондам" из 1С|изменил название
|07 фонд Поставщиков (поступление)|Поступление|01 Операционная деятельность|возврат переплаты по приобретаемому товару|Отчет "Оплата по фондам" из 1С|
|07 фонд Складской логистики|Выбытие|01 Операционная деятельность|жизнедеятельность склада: газ, расходники, упаковка, спецодежда|Отчет "Оплата по фондам" из 1С|важно не путать с АХО
|07 фонд Складской логистики (техника)|Выбытие|01 Операционная деятельность|покупка и ремонт мелкого складского транспорта до 850 EUR|Отчет "Оплата по фондам" из 1С|изменил название и описание
|07 фонд Транспортной логистики (входящая)|Выбытие|01 Операционная деятельность|логистика на приобретение товара|Отчет "Оплата по фондам" из 1С|изменил название
|07 фонд Транспортной логистики (исходящая)|Выбытие|01 Операционная деятельность|логистика на отправку товара|Отчет "Оплата по фондам" из 1С|изменил название
|08 фонд Кредитов (% по займам)|Выбытие|01 Операционная деятельность|выплата процентов по кредитам и займам|Отчет "Оплата по фондам" из 1С|изменил название
|08 фонд Кредитов (выбытие)|Выбытие|03 Финансовая деятельность|выплата тела кредитов|Отчет "Оплата по фондам" из 1С|изменил название
|08 фонд Кредитов (поступление)|Поступление|03 Финансовая деятельность|полученные кредиты и займы|Отчет "Оплата по фондам" из 1С|изменил название
|09 фонд Благотворительности|Выбытие|01 Операционная деятельность|списания на благотворительность|Отчет "Оплата по фондам" из 1С|изменил название`;

const SAMPLE_OPERATIONS = `Дата;Статья ДДС;Сумма;Группа;Комментарий
2026-01-05;01 фонд GH;18500;Поступление;Оплата от клиента
2026-01-08;07 фонд Поставщиков (выбытие);-9200;Выбытие;Оплата поставщику
2026-01-11;07 фонд Транспортной логистики (исходящая);-1400;Выбытие;Отправки DHL
2026-01-20;04 фонд Рекламы;-800;Выбытие;Маркетинг
2026-02-02;02 фонд MGH;9500;Поступление;Продажи MGH
2026-02-12;06 ФОТ (оклад);-4300;Выбытие;Зарплата
2026-02-17;05 фонд Оборудование;-1300;Выбытие;Планшеты
2026-03-04;08 фонд Кредитов (поступление);25000;Поступление;Получен кредит
2026-03-18;08 фонд Кредитов (выбытие);-5000;Выбытие;Погашение кредита`; 

const articleRows = parseArticleRows(RAW_ARTICLES);
const activeArticleRows = articleRows.filter((row) => row.status !== "DELETE");
const articleByName = buildArticleMap(activeArticleRows);

const state = {
  operations: [],
  filteredOperations: [],
  reportRows: [],
  monthRows: [],
};

const operationsFile = document.getElementById("operationsFile");
const loadSampleBtn = document.getElementById("loadSampleBtn");
const downloadTemplateBtn = document.getElementById("downloadTemplateBtn");
const fileStatus = document.getElementById("fileStatus");
const dateFromInput = document.getElementById("dateFrom");
const dateToInput = document.getElementById("dateTo");
const activityFilter = document.getElementById("activityFilter");
const resetFiltersBtn = document.getElementById("resetFilters");
const downloadReportCsvBtn = document.getElementById("downloadReportCsv");
const reportMetrics = document.getElementById("reportMetrics");
const reportTableBody = document.getElementById("reportTableBody");
const monthTableBody = document.getElementById("monthTableBody");
const dictionarySearch = document.getElementById("dictionarySearch");
const dictionaryBody = document.getElementById("dictionaryBody");

init();

function init() {
  fillActivityFilter();
  renderDictionary();
  renderReport();

  operationsFile.addEventListener("change", onFileUploaded);
  loadSampleBtn.addEventListener("click", () => loadOperationsFromText(SAMPLE_OPERATIONS, "пример"));
  downloadTemplateBtn.addEventListener("click", downloadTemplateCsv);
  dateFromInput.addEventListener("change", renderReport);
  dateToInput.addEventListener("change", renderReport);
  activityFilter.addEventListener("change", renderReport);
  resetFiltersBtn.addEventListener("click", resetFilters);
  downloadReportCsvBtn.addEventListener("click", downloadReportCsv);
  dictionarySearch.addEventListener("input", renderDictionary);
}

function parseArticleRows(raw) {
  return raw
    .trim()
    .split("\n")
    .map((line, idx) => {
      const [articleNoRaw, name, group, activity, description, source, comment] = line
        .split("|")
        .map((cell) => cell.trim());

      return {
        id: idx + 1,
        articleNoRaw,
        name,
        group,
        activity,
        description,
        source,
        comment,
        status: resolveArticleStatus(articleNoRaw, comment),
      };
    });
}

function resolveArticleStatus(articleNoRaw, comment) {
  const raw = normalizeText(articleNoRaw);
  const cmt = normalizeText(comment);

  if (raw.startsWith("удалить")) return "DELETE";
  if (raw.startsWith("поменять")) return "RENAME";
  if (cmt.includes("не актуальный") || cmt.includes("неактуальный")) return "INACTIVE";
  return "ACTIVE";
}

function buildArticleMap(items) {
  const map = new Map();

  items.forEach((row) => {
    map.set(normalizeText(row.name), row);

    const renameTargetPrefix = "поменять на ";
    const noRaw = normalizeText(row.articleNoRaw);
    if (noRaw.startsWith(renameTargetPrefix)) {
      const renamedTo = row.articleNoRaw.slice(renameTargetPrefix.length).trim();
      if (renamedTo) {
        map.set(normalizeText(renamedTo), {
          ...row,
          name: renamedTo,
          status: "ACTIVE",
        });
      }
    }
  });

  return map;
}

function fillActivityFilter() {
  const activities = [...new Set(activeArticleRows.map((row) => row.activity))].sort((a, b) =>
    a.localeCompare(b, "ru")
  );

  activities.forEach((activity) => {
    const option = document.createElement("option");
    option.value = activity;
    option.textContent = activity;
    activityFilter.append(option);
  });

  const unknown = document.createElement("option");
  unknown.value = "Не определено";
  unknown.textContent = "Не определено";
  activityFilter.append(unknown);
}

function onFileUploaded(event) {
  const [file] = event.target.files || [];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || "");
    loadOperationsFromText(text, file.name);
  };
  reader.onerror = () => {
    fileStatus.textContent = "Ошибка чтения файла. Проверьте CSV и повторите.";
  };

  reader.readAsText(file, "utf-8");
}

function loadOperationsFromText(csvText, sourceName) {
  try {
    const parsed = parseOperationsCsv(csvText);
    state.operations = parsed;

    const dates = parsed
      .map((row) => row.dateObj)
      .filter(Boolean)
      .sort((a, b) => a.getTime() - b.getTime());

    if (dates.length > 0) {
      dateFromInput.value = toDateInputValue(dates[0]);
      dateToInput.value = toDateInputValue(dates[dates.length - 1]);
    }

    fileStatus.textContent = `Загружено: ${sourceName}. Операций: ${parsed.length}.`;
    renderReport();
  } catch (error) {
    state.operations = [];
    renderReport();
    fileStatus.textContent = `Ошибка: ${error.message}`;
  }
}

function parseOperationsCsv(text) {
  const cleanText = text.replace(/^\uFEFF/, "").trim();
  if (!cleanText) throw new Error("CSV пустой.");

  const firstLine = cleanText.split("\n")[0] || "";
  const delimiter = (firstLine.match(/;/g) || []).length >= (firstLine.match(/,/g) || []).length ? ";" : ",";

  const rows = parseCsv(cleanText, delimiter);
  if (rows.length < 2) throw new Error("В CSV нет данных.");

  const headers = rows[0].map((header) => normalizeText(header));

  const idxDate = findColumn(headers, ["дата", "date"]);
  const idxArticle = findColumn(headers, ["статья ддс", "статья", "фонд", "article"]);
  const idxAmount = findColumn(headers, ["сумма", "amount", "итого", "sum"]);
  const idxType = findColumn(headers, ["группа", "вид операции", "операция", "тип"]);

  if (idxDate === -1) throw new Error("Не найдена колонка 'Дата'.");
  if (idxArticle === -1) throw new Error("Не найдена колонка 'Статья ДДС' или 'Фонд'.");
  if (idxAmount === -1) throw new Error("Не найдена колонка 'Сумма'.");

  return rows
    .slice(1)
    .map((cells, rowIdx) => {
      const dateRaw = (cells[idxDate] || "").trim();
      const articleRaw = (cells[idxArticle] || "").trim();
      const amountRaw = (cells[idxAmount] || "").trim();
      const typeRaw = idxType >= 0 ? (cells[idxType] || "").trim() : "";

      const amountValue = parseAmount(amountRaw);
      if (amountValue === null) return null;

      const dateObj = parseFlexibleDate(dateRaw);
      if (!dateObj) {
        throw new Error(`Неверная дата в строке ${rowIdx + 2}: ${dateRaw}`);
      }

      const matched = findArticle(articleRaw);
      const type = resolveOperationType(typeRaw, amountValue, matched?.group);

      return {
        dateRaw,
        dateObj,
        articleInput: articleRaw,
        article: matched?.name || articleRaw,
        activity: matched?.activity || "Не определено",
        amount: Math.abs(amountValue),
        direction: type,
      };
    })
    .filter(Boolean);
}

function parseCsv(text, delimiter) {
  const rows = [];
  let currentCell = "";
  let currentRow = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        currentCell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      currentRow.push(currentCell.trim());
      currentCell = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1;
      currentRow.push(currentCell.trim());
      currentCell = "";
      rows.push(currentRow);
      currentRow = [];
      continue;
    }

    currentCell += char;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows.filter((row) => row.some((cell) => cell !== ""));
}

function findColumn(headers, candidates) {
  return headers.findIndex((header) => candidates.some((candidate) => header.includes(candidate)));
}

function parseAmount(raw) {
  let cleaned = String(raw || "").trim().replace(/\s/g, "").replace(/[^\d,.-]/g, "");
  if (!cleaned) return null;

  // Supports both 1,234.56 and 1.234,56 formats.
  if (cleaned.includes(",") && cleaned.includes(".")) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      cleaned = cleaned.replace(/,/g, "");
    }
  } else if (cleaned.includes(",")) {
    cleaned = cleaned.replace(",", ".");
  }

  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function parseFlexibleDate(raw) {
  if (!raw) return null;

  const clean = raw.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const date = new Date(`${clean}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const parts = clean.split(/[./-]/).map((item) => item.trim());
  if (parts.length !== 3) return null;

  let day;
  let month;
  let year;

  if (parts[0].length === 4) {
    year = Number(parts[0]);
    month = Number(parts[1]);
    day = Number(parts[2]);
  } else {
    day = Number(parts[0]);
    month = Number(parts[1]);
    year = Number(parts[2]);
  }

  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function resolveOperationType(typeRaw, amountValue, defaultGroup) {
  const normalized = normalizeText(typeRaw);

  if (normalized.includes("поступ")) return "Поступление";
  if (normalized.includes("выбыт") || normalized.includes("расход")) return "Выбытие";

  if (defaultGroup === "Поступление" || defaultGroup === "Выбытие") return defaultGroup;

  return amountValue < 0 ? "Выбытие" : "Поступление";
}

function findArticle(input) {
  const normalized = normalizeText(input);

  if (articleByName.has(normalized)) {
    return articleByName.get(normalized);
  }

  for (const [articleName, row] of articleByName.entries()) {
    if (normalized.includes(articleName) || articleName.includes(normalized)) {
      return row;
    }
  }

  return null;
}

function renderReport() {
  const filteredOperations = getFilteredOperations();
  state.filteredOperations = filteredOperations;

  const { reportRows, totalsByActivity, grandTotals } = aggregateByArticle(filteredOperations);
  state.reportRows = reportRows;

  const monthRows = aggregateByMonth(filteredOperations);
  state.monthRows = monthRows;

  const unknownCount = filteredOperations.filter((op) => op.activity === "Не определено").length;
  renderMetrics(grandTotals, filteredOperations.length, unknownCount);
  renderReportTable(reportRows, totalsByActivity, grandTotals);
  renderMonthTable(monthRows);
}

function getFilteredOperations() {
  const from = dateFromInput.value ? parseFlexibleDate(dateFromInput.value) : null;
  const to = dateToInput.value ? parseFlexibleDate(dateToInput.value) : null;
  const activity = activityFilter.value;

  return state.operations.filter((op) => {
    const inFromRange = !from || op.dateObj >= from;
    const inToRange = !to || op.dateObj <= to;
    const activityOk = activity === "all" || op.activity === activity;

    return inFromRange && inToRange && activityOk;
  });
}

function aggregateByArticle(operations) {
  const grouped = new Map();

  operations.forEach((op) => {
    const key = `${op.activity}___${op.article}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        activity: op.activity,
        article: op.article,
        inAmount: 0,
        outAmount: 0,
        count: 0,
      });
    }

    const bucket = grouped.get(key);
    if (op.direction === "Поступление") bucket.inAmount += op.amount;
    else bucket.outAmount += op.amount;
    bucket.count += 1;
  });

  const reportRows = [...grouped.values()].map((row) => ({
    ...row,
    net: row.inAmount - row.outAmount,
  }));

  reportRows.sort((a, b) => {
    const activityOrder = a.activity.localeCompare(b.activity, "ru");
    if (activityOrder !== 0) return activityOrder;
    return a.article.localeCompare(b.article, "ru");
  });

  const totalsByActivity = new Map();
  reportRows.forEach((row) => {
    if (!totalsByActivity.has(row.activity)) {
      totalsByActivity.set(row.activity, { inAmount: 0, outAmount: 0, net: 0, count: 0 });
    }
    const totals = totalsByActivity.get(row.activity);
    totals.inAmount += row.inAmount;
    totals.outAmount += row.outAmount;
    totals.net += row.net;
    totals.count += row.count;
  });

  const grandTotals = {
    inAmount: reportRows.reduce((sum, row) => sum + row.inAmount, 0),
    outAmount: reportRows.reduce((sum, row) => sum + row.outAmount, 0),
    net: reportRows.reduce((sum, row) => sum + row.net, 0),
    count: reportRows.reduce((sum, row) => sum + row.count, 0),
  };

  return { reportRows, totalsByActivity, grandTotals };
}

function aggregateByMonth(operations) {
  const monthMap = new Map();

  operations.forEach((op) => {
    const monthKey = `${op.dateObj.getFullYear()}-${String(op.dateObj.getMonth() + 1).padStart(2, "0")}`;

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { month: monthKey, inAmount: 0, outAmount: 0 });
    }

    const bucket = monthMap.get(monthKey);
    if (op.direction === "Поступление") bucket.inAmount += op.amount;
    else bucket.outAmount += op.amount;
  });

  return [...monthMap.values()]
    .map((row) => ({ ...row, net: row.inAmount - row.outAmount }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

function renderMetrics(totals, operationCount, unknownCount) {
  reportMetrics.innerHTML = `
    <article class="metric"><div class="label">Операций</div><div class="value">${operationCount}</div></article>
    <article class="metric"><div class="label">Поступления</div><div class="value">${formatMoney(totals.inAmount)}</div></article>
    <article class="metric"><div class="label">Выбытия</div><div class="value">${formatMoney(totals.outAmount)}</div></article>
    <article class="metric"><div class="label">Чистый поток</div><div class="value">${formatMoney(totals.net)}</div></article>
    <article class="metric"><div class="label">Не сопоставлено со справочником</div><div class="value">${unknownCount}</div></article>
  `;
}

function renderReportTable(rows, totalsByActivity, grandTotals) {
  if (rows.length === 0) {
    reportTableBody.innerHTML = `<tr><td colspan="6" class="empty">Загрузите CSV операций для расчета ДДС.</td></tr>`;
    return;
  }

  let html = "";

  rows.forEach((row, index) => {
    html += `
      <tr>
        <td>${escapeHtml(row.activity)}</td>
        <td>${escapeHtml(row.article)}</td>
        <td>${formatMoney(row.inAmount)}</td>
        <td>${formatMoney(row.outAmount)}</td>
        <td>${formatMoney(row.net)}</td>
        <td>${row.count}</td>
      </tr>
    `;

    const nextActivity = rows[index + 1]?.activity;
    if (row.activity !== nextActivity) {
      const t = totalsByActivity.get(row.activity);
      html += `
        <tr class="section-total">
          <td colspan="2">Итого: ${escapeHtml(row.activity)}</td>
          <td>${formatMoney(t.inAmount)}</td>
          <td>${formatMoney(t.outAmount)}</td>
          <td>${formatMoney(t.net)}</td>
          <td>${t.count}</td>
        </tr>
      `;
    }
  });

  html += `
    <tr class="grand-total">
      <td colspan="2">Итого по ДДС</td>
      <td>${formatMoney(grandTotals.inAmount)}</td>
      <td>${formatMoney(grandTotals.outAmount)}</td>
      <td>${formatMoney(grandTotals.net)}</td>
      <td>${grandTotals.count}</td>
    </tr>
  `;

  reportTableBody.innerHTML = html;
}

function renderMonthTable(monthRows) {
  if (monthRows.length === 0) {
    monthTableBody.innerHTML = `<tr><td colspan="4" class="empty">Нет данных.</td></tr>`;
    return;
  }

  monthTableBody.innerHTML = monthRows
    .map(
      (row) => `
      <tr>
        <td>${row.month}</td>
        <td>${formatMoney(row.inAmount)}</td>
        <td>${formatMoney(row.outAmount)}</td>
        <td>${formatMoney(row.net)}</td>
      </tr>`
    )
    .join("");
}

function renderDictionary() {
  const query = normalizeText(dictionarySearch.value || "");

  const filtered = articleRows.filter((row) => {
    if (!query) return true;
    return normalizeText(`${row.articleNoRaw} ${row.name} ${row.activity}`).includes(query);
  });

  dictionaryBody.innerHTML = filtered
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.articleNoRaw)}</td>
        <td>${escapeHtml(row.name)}</td>
        <td>${escapeHtml(row.group)}</td>
        <td>${escapeHtml(row.activity)}</td>
        <td><span class="badge ${row.status}">${statusLabel(row.status)}</span></td>
      </tr>
    `
    )
    .join("");
}

function resetFilters() {
  dateFromInput.value = "";
  dateToInput.value = "";
  activityFilter.value = "all";
  renderReport();
}

function downloadTemplateCsv() {
  const blob = new Blob([SAMPLE_OPERATIONS], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, "dds-operations-template.csv");
}

function downloadReportCsv() {
  if (state.reportRows.length === 0) {
    fileStatus.textContent = "Сначала загрузите операции CSV, затем выгружайте отчет.";
    return;
  }

  const lines = [["Вид деятельности", "Статья ДДС", "Поступления", "Выбытия", "Чистый поток", "Операций"]];

  state.reportRows.forEach((row) => {
    lines.push([
      row.activity,
      row.article,
      formatNumberForCsv(row.inAmount),
      formatNumberForCsv(row.outAmount),
      formatNumberForCsv(row.net),
      String(row.count),
    ]);
  });

  const csv = lines
    .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";"))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, "dds-report.csv");
}

function triggerDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function toDateInputValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatNumberForCsv(value) {
  return Number(value || 0).toFixed(2).replace(".", ",");
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/\s+/g, " ")
    .trim();
}

function statusLabel(status) {
  if (status === "DELETE") return "Удалить";
  if (status === "RENAME") return "Переименовать";
  if (status === "INACTIVE") return "Неактуально";
  return "Активно";
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
