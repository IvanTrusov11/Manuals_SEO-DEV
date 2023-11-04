// GPT 3 TURBO // 

function generateProductDescriptions() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    for (let i = 2; i <= lastRow; i++) {
      const productName = sheet.getRange(`B${i}`).getValue();
      const characteristics = sheet.getRange(`C${i}`).getValue();
      const descriptionCell = sheet.getRange(`F${i}`);
      
      if (productName && characteristics && !descriptionCell.getValue()) {
        const prompt = `
        Напиши текст с уникальностью не менее 95% для коммерческой страницы - карточки товара интернет-магазина "Pechka-Shop".
  Текст должен быть объёмом в 1500 символов.
  В тексте не должно быть спама ключевых фраз (частого употребления одного и того же ключа - например, названия товаров).
  Текст не должен быть "приукрашен" - пишем только по делу. Текст должен раскрывать семантический граф и интент запроса основного ключа.
  
  Название товара - Основной ключ (название темы) : ${productName}.
  Основные характеристики товара: ${characteristics}.
  
  В тексте необходимо использовать следующие ключевые фразы:
  [название товара] - 2-3 вхождения;
  купить - 1 раз;
  цена - 1 раз;
  стоимость - 1 раз; 
  интернет-магазин - 1 раз;
  санкт-петербург (Спб) - 1 раз;
  недорого - 1 раз;
  
  !Важно: употребить фразы в указанном колличестве, но не более. 
  
  Структура текста:
  1. О изделии 
  !Важно: не задавать заголовок в тексте. Каждый текст начинается без h1.
  !Важно: здесь текст должен состоять из 2-х объёмных абзацев
      - кратко о производитиле (кратко);
      - что это: из чего состоит
  2. Особенности и преимущества изделия 
      - важные особенности
      - важные преимущества 
  
  !Нельзя писать о том, что нужно проконсультироваться со специалистом. 
        `;
        const generatedDescription = callOpenAI(prompt);
        descriptionCell.setValue(generatedDescription);
      }
    }
  }
  
  function callOpenAI(prompt) {
    const apiKey = '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';
    
    const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      payload: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: "You are a helpful assistant."},
          {role: "user", content: prompt}
        ],
        max_tokens: 300
      })
    });
  
    const result = JSON.parse(response.getContentText());
    return result.choices[0].message.content.trim();
  }



// GPT 4 TURBO //

function generateProductDescriptions() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // Проходим по всем строкам с данными продуктов
    for (let i = 2; i <= lastRow; i++) {
      const productName = sheet.getRange(`B${i}`).getValue();
      const characteristics = sheet.getRange(`C${i}`).getValue();
      const descriptionCell = sheet.getRange(`K${i}`);
      
      // Генерируем описание только если ячейка описания пуста
      if (productName && characteristics && !descriptionCell.getValue()) {
        const prompt = `
        A. Напиши SEO-оптимизированное описание для карточки товара интернет-магазина. Описание должно быть структурировано, содержать ключевые запросы, отвечать на потребности поискового интента и семантического графа основного ключевого запроса (названия товара), быть полезным для читателя и пользователя. Избегай повторения и воды, избегай переспама ключевых фраз (частого употребление одного и того же запроса, например, названия товара)
  Необходимо реализовать текст с уникальностью не менее 95% для коммерческой страницы - карточки товара интернет-магазина "Pechka-Shop". Текст должен быть объёмом в 1500 символов.
  
  B. От куда брать информацию о товаре: 
  Название товара - Основной ключ (название темы) : ${productName}.
  Основные характеристики товара: ${characteristics}.
  C. В тексте необходимо использовать следующие ключевые фразы: 
  [название товара] - 2-3 вхождения (НЕ БОЛЕЕ!!!);
  купить - употребить не более 1 раза;
  цена - употребить не более 1 раза;
  стоимость - употребить не более 1 раза; 
  интернет-магазин - употребить не более 1 раза;
  санкт-петербург (Спб) – употребить не более 1 раза;
  недорого - употребить не более 1 раза;
  
  !Важно: употребить фразы в указанном количестве, но не более!
  
  D. Структура текста:
  
  1. Описание 
  !Важно: не задавать заголовок в тексте. Каждый текст начинается без h1
  !Важно: здесь текст должен состоять из 2-х объёмных абзацев. Текст из 2-х абзацев под этим заголовком должен быть самым объёмным во всём тексте.
            О ЧЁМ ПИСАТЬ:
  - Краткое введение товаре, его основных функциях и преимуществах.
  - Упоминание о том, какой товар (исходя из названия – характеристики)
  
  2. Особенности и преимущества [название товара]
  !Важно: использовать заголовок h2, после которого будет текст о особенностях и преимуществах:
  !Важно: под этим заголовком необходимо использовать 1 маркированный список (не более)
  - Энергоэффективность и экономия топлива 
  - Долговечность и надёжность материалов
  
  3. Технические характеристики
  !Важно: использовать заголовок h2, после которого будет текст о особенностях и технических характеристиках:
  !Важно: не описывать ВСЕ характеристики, необходимо описать наиболее важные для пользователя - важные, у самого товара.
  - Размеры, вес, мощность отопления;
  - Тип топлива;
  - Дополнительные функции
  
  
  !Нельзя писать о том, что нужно проконсультироваться со специалистом.
  
  4. Текст необходимо выдавать в разметке HTML , используя теги p , ul/li , h2
  5. Писать по делу
  Очень часто ты после этого задания выдаёшь текст таким образом, что он о воде - о уюте в доме, о прекрасном виде и тд. То-есть не о товаре будто. Постарайся не заострять на этом внимание. Важно описать: что за изделие, из чего, где применяется, характеристики. А не писать о том, насколько изделие "непревзойдённое" и так далее..
  
  
  
        `; // Ваша инструкция для модели, как указано выше
        
        // Вызываем функцию для генерации описания
        const generatedDescription = callOpenAI(prompt);
        descriptionCell.setValue(generatedDescription); // Устанавливаем сгенерированное описание в ячейку
      }
    }
  }
  
  function callOpenAI(prompt) {
    const apiKey = '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'; // Замените на ваш фактический API-ключ
    
    // Формируем данные для запроса к API
    const data = {
      model: "gpt-4", // Указываем модель GPT-4
      messages: [
        {role: "system", content: "You are an expert in the field and subject of heating equipment: fireplaces, stoves, heating stoves, fireplace inserts, linings and portals, chimneys and accessories - and everything related to this topic. You are a professional copywriter with knowledge of SEO, for writing high-quality optimized texts, according to Google and Yandex algorithms."},
        {role: "user", content: prompt}
      ],
      max_tokens: 450,
      temperature: 0.2, // Попробуйте увеличить для большего творчества
      top_p: 0.8, // Попробуйте уменьшить для большего разнообразия
      frequency_penalty: 0.5, // Увеличьте для уменьшения повторения
      presence_penalty: 0.5 // Увеличьте для поощрения новых идей
    };
  
    // Настройки запроса, включая метод, заголовки и тело
    const options = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(data),
      muteHttpExceptions: true // Для получения полного ответа сервера при ошибке
    };
  
    try {
      // Выполняем запрос к OpenAI API
      const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
      const result = JSON.parse(response.getContentText());
      if (response.getResponseCode() == 200) {
        // Возвращаем текст без начальных и конечных пробелов, если запрос успешен
        return result.choices[0].message.content.trim();
      } else {
        // Логируем ошибку, если статус ответа не равен 200
        Logger.log('Ошибка при вызове OpenAI API: ' + response.getContentText());
        return "Произошла ошибка при генерации описания.";
      }
    } catch (e) {
      // Логируем ошибку, если что-то пошло не так
      Logger.log('Ошибка при вызове OpenAI API: ' + e.toString());
      return "Произошла ошибка при генерации описания.";
    }
  }
  