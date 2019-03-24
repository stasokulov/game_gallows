window.addEventListener('DOMContentLoaded', function(){ 
    let alphabet = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ь", "ы", "ъ", "э", "ю", "я"];
    let gallows = ['man1', 'man2', 'man3', 'man4', 'man5', 'man6', 'man7', 'man8'];

    let categories, //Массив с темами
        chosenCategory, //Выбранная категория
        word, // Слово
        guesses = [], //Массив с попытками
        lives, //Жизни
        space; //Пробелы

    let showLives = document.getElementById("mylives"),
        showCategory = document.querySelector('#catagoryName'),
        reset = document.querySelector('#reset');

    //Создаем кнопки с буквами алфавита
    function createButtons(){
        let myButtons = document.querySelector('#buttons'),
            letters = document.createElement('ul');
            letters.id = 'alphabet';
            myButtons.appendChild(letters);
            
        for (let i=0; i<alphabet.length; i++){
            let list = document.createElement('li');
            list.innerHTML = alphabet[i];
            letters.appendChild(list);
        };
    };

    //Функция выбора категории
    function selectCat() {
        if(chosenCategory === categories[0]){
            showCategory.textContent = 'Выбранная категория: Страны'
        } else if (chosenCategory === categories[1]){
            showCategory.textContent = 'Выбранная категория: Животные'
        } else if (chosenCategory === categories[2]){
            showCategory.textContent = 'Выбранная категория: Деревья'
        }
    };
    //Вывод зашиврованного слова на экран
    function result (){
        let wordHolder = document.getElementById('hold'),
        correct = document.createElement('ul');

        for (let i = 0; i < word.length; i++){
            correct.setAttribute('id', 'my-word');
            let guess = document.createElement('li');
            guess.setAttribute('class', "guess");

            if(word[i] === ' '){
                guess.innerHTML = '_';
                space = 1;
            } else {
                guess.innerHTML = '-';
            };

            guesses.push(guess);
            correct.appendChild(guess);
        };

        wordHolder.appendChild(correct);
    };

    //Отображение букв
    function show (){
        lettersPlace = document.getElementById('alphabet');
        lettersPlace.addEventListener('click', function (a) {
            let elem = a.toElement; //Ловим элемент по которому кликнули
            let hiddenWord = document.getElementById('my-word').childNodes;//Скрытое слово
            let lowerWord = word.toLowerCase();//Загаданное слово в нижнем регистре
                        
            if (elem.localName == 'li'){ //Если крикнули по пункту списка
                let lose = true;

                for (let i = 0; i < word.length; i++) {

                    if(elem.innerText == lowerWord[i]) {//Перебираем буквы слова на совпадение
                    hiddenWord[i].innerText = word[i]; //Вставляем букву
                    lose = false; //Ошибки нет
                   };
                };

                if (lose == true){ //Рисуем виселицу
                    
                        document.getElementById(gallows[0]).classList.remove('inv');
                        gallows.shift();
                        console.log(gallows[0]);
                        if (gallows[0] == undefined) {                    
                        let youLose = document.getElementById('youLose');
                        youLose.classList.remove('inv');
                    };


                } else {
                    let check = true;
                    for (let i = 0; i < word.length; i++) {

                        if(hiddenWord[i].innerText == '-') { //Остались ли не угаданные буквы
                            check = false;                        
                        };
                    };

                    if (check == true) { //Победа
                        let win = document.getElementById('win');
                        win.classList.remove('inv');                             
                    };
                };
            };
        });
    };

   

    //Функция, запускающая всю программу
    function play(){
        categories = [
            //Страны
            ["Уругвай", "Канада", "Албания", "Бразилия", "Египет", "Ямайка"],
            //Животные
            ["Кенгуру", "Гусь", "Медведь", "Зебра", "Лошадь"],
            //Деревья
            ["Осина", "Липа", "Берёза", "Лох серебристый", "Лиственница", "Баобаб"]
        ];

        //Перезагрузка страницы
        function res(){
           reset.addEventListener("click", function(){
                location.reload();
            });
           
        };

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, ' ');
        createButtons();
        selectCat();
        result();
        show ();
        res ();    
        console.log(word);    
    };
    
    play();    

});


