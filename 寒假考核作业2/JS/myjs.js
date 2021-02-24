window.onload = function() {
    var box = document.getElementById('box');
    //引入装载蛇的容器
    (function() {
        var element = [];
        //数组用于储存食物，方便删除旧的食物
        function Food() {
            this.width = 20;
            this.height = 20;
            this.color = 'red';
        }
        //定义食物的属性
        Food.prototype.init = function() {
                remove();
                var a = document.createElement('div');
                a.style.width = this.width + 'px';
                a.style.height = this.height + 'px';
                a.style.position = 'absolute';
                a.style.background = this.color;
                this.x = Math.floor(Math.random() * 40);
                this.y = Math.floor(Math.random() * 20);
                a.style.left = this.x * this.width + 'px';
                a.style.top = this.y * this.height + 'px';
                a.style.borderRadius = '50%';
                box.appendChild(a);
                //将食物添加到游戏盒子中
                element.push(a);
                //将食物添加到数组中
            }
            //为原型添加初始化的方法主要用于食物在box上显示

        function remove() {
            for (var i = 0; i < element.length; i++) {
                var e = element[i];
                e.parentNode.removeChild(e);
                //找到该元素的父级元素，并将自己从该父级元素中删去
                element.splice(i, 1);
                //将数组中的该元素删去
            }
        }
        //删除旧的食物的函数

        window.Food = Food;
        //全局都可以加载，用于游戏的加载
    }());
    //食物的自调用函数
    (function() {
        var element = [];

        function Snake() {
            this.width = 20;
            this.height = 20;
            this.direction = 'right';
            this.body = [
                { x: 2, y: 0, color: "black" },
                { x: 1, y: 0, color: "orange" },
                { x: 0, y: 0, color: "orange" }
            ];
        }
        //定义蛇的属性，设置初始的蛇有三个部位
        Snake.prototype.init = function() {
                remove();
                for (var i = 0; i < this.body.length; i++) {
                    var b = document.createElement('div');
                    this.body[i].flag = b;
                    b.style.position = 'absolute';
                    b.style.left = this.body[i].x * this.width + 'px';
                    b.style.top = this.body[i].y * this.height + 'px';
                    b.style.borderRadius = '50%';
                    b.style.width = this.width + 'px';
                    b.style.height = this.height + 'px';
                    b.style.background = this.body[i].color;
                    box.appendChild(b);
                    //将蛇添加到游戏盒子中
                    element.push(b);
                    //将蛇添加到数组中
                }
            }
            //为原型添加初始化的方法主要用于蛇在box上显示
        Snake.prototype.move = function() {
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            //设置蛇的身体的移动后一个覆盖前一个
            switch (this.direction) {
                case "left":
                    this.body[0].x -= 1;
                    break;
                case "top":
                    this.body[0].y -= 1;
                    break;
                case "bottom":
                    this.body[0].y += 1;
                    break;
                case "right":
                    this.body[0].x += 1;
                    break;
            }
            //设置蛇的头部移动
            if (snake.body.length > 20 || this.body[0].x == fooding.x && this.body[0].y == fooding.y) {
                clearInterval(timer);
                clearInterval(time);
                alert("恭喜你，通关了");
                snake.body = [
                    { x: 2, y: 0, color: "black" },
                    { x: 1, y: 0, color: "orange" },
                    { x: 0, y: 0, color: "orange" }
                ];
                snake.direction = 'right';

            }
            if (snake.body[0].x < 0 || snake.body[0].x > 39 || snake.body[0].y < 0 || snake.body[0].y > 19) {
                clearInterval(timer);
                clearInterval(time);
                alert("这是墙，你怎么可以撞墙！");
                snake.body = [
                    { x: 2, y: 0, color: "black" },
                    { x: 1, y: 0, color: "orange" },
                    { x: 0, y: 0, color: "orange" }
                ];
                snake.direction = 'right';
            }
            //当蛇撞到游戏盒子的边界的情况
            for (var i = 4; i < snake.body.length; i++) {
                //因为蛇有4个和4个一下部位的时候永远吃不到自己，所以从第5个开始计算
                if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                    clearInterval(timer);
                    clearInterval(time);
                    alert("疯了吗？你怎么能吃自己呢？");
                    snake.body = [
                        { x: 2, y: 0, color: "black" },
                        { x: 1, y: 0, color: "orange" },
                        { x: 0, y: 0, color: "orange" }
                    ];
                    snake.direction = 'right';
                }
            }
            //当蛇吃到自己身体时的情况
            if (this.body[0].x == food.x && this.body[0].y == food.y) {
                var last = this.body[this.body.length - 1];
                //找出蛇的最后一节
                this.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                });
                //复制一个加上
                food.init();
                //重新加载食物
            }
            //蛇吃到食物的时候，蛇身子边长，食物重新加载
        }

        function remove() {
            for (var i = element.length - 1; i >= 0; i--) {
                var e = element[i];
                e.parentNode.removeChild(e);
                //找到该元素的父级元素，并将自己从该父级中删去
                element.splice(i, 1);
                //将该元素从包含他的数组中删去
            }
        } //用于删除旧的蛇
        window.Snake = Snake;
        //全局都可以加载，用于游戏的加载
    }());
    //蛇的自调用函数
    (function() {
        var element = [];
        //储存特殊食物的数组，方便删除旧的食物

        function Fooding() {
            this.width = 20;
            this.height = 20;
            this.color = 'black';
        }
        //定义特殊食物的属性
        Fooding.prototype.init = function() {
            remove();
            var a = document.createElement('div');
            a.style.width = this.width + 'px';
            a.style.height = this.height + 'px';
            a.style.background = this.color;
            a.style.position = 'absolute';
            this.x = Math.floor(Math.random() * 40);
            this.y = Math.floor(Math.random() * 20);
            a.style.borderRadius = '50%';
            a.style.left = this.x * this.width + 'px';
            a.style.top = this.y * this.height + 'px';
            box.appendChild(a);
            //将其添加到游戏盒子中
            element.push(a);
            //将其添加到数组中
        }

        function remove() {
            for (var i = 0; i < element.length; i++) {
                var e = element[i];
                e.parentNode.removeChild(e);
                //找到该元素的父级元素，并将自己从该父级元素中删去
                element.splice(i, 1);
                //将数组中的该元素删去
            }
        }
        //用于删除旧的食物的函数
        window.Fooding = Fooding;
        //使其能在全局中加载
    }()); //特殊食物的自调用函数
    var btn = document.getElementById('begin');
    //获取开始游戏的按钮
    var button = document.getElementById('speed');
    //获取加速按钮
    var buttonspeed = document.getElementById('speeding');
    //获取超级加速按钮
    var buttonslow = document.getElementById('slow');
    //获取减速按钮
    var timer;
    var time;
    //设置定时器
    var food = new Food();
    var snake = new Snake();
    var fooding = new Fooding();
    snake.init();
    //蛇初始化显示
    food.init();
    //食物初始化显示
    fooding.init();
    //特殊食物初始化显示
    btn.onclick = function() {
        //点击开始游戏按钮，发生的事件
        clearInterval(timer);
        timer = setInterval(function() {
                snake.init();
                snake.move();
            }, 150) //蛇的移动
        clearInterval(time);
        time = setInterval(function() {
                fooding.init();
            }, 700) //特殊食物的移动
            //平常的速度
        button.onclick = function() {
                clearInterval(timer);
                timer = setInterval(function() {
                        snake.init();
                        snake.move();
                    }, 50) //蛇的速度
                clearInterval(time);
                time = setInterval(function() {
                        fooding.init();
                    }, 300) //特殊食物的速度
            } //加速时的速度
        buttonspeed.onclick = function() {
                clearInterval(timer);
                timer = setInterval(function() {
                        snake.init();
                        snake.move();
                    }, 20) //蛇的速度
                clearInterval(time);
                time = setInterval(function() {
                        fooding.init();
                    }, 100) //特殊食物的速度
            } //超级加速时的速度
        buttonslow.onclick = function() {
                clearInterval(timer);
                timer = setInterval(function() {
                        snake.init();
                        snake.move();
                    }, 300) //蛇的速度
                clearInterval(time);
                time = setInterval(function() {
                        fooding.init();
                    }, 1000) //特殊食物的速度
            } //减速时的速度

        //定时器使蛇运动
        document.body.onkeydown = function(e) {
            //键盘的上下左右键的点击事件，用其keyCode的值判定所得
            var event = e || window.event;
            switch (event.keyCode) {
                case 38:
                    if (snake.direction != 'bottom') {
                        snake.direction = "top";
                    }
                    break;
                case 40:
                    if (snake.direction != "top") {
                        snake.direction = "bottom";
                    }
                    break;
                case 37:
                    if (snake.direction != "right") {
                        snake.direction = "left";
                    }
                    break;
                case 39:
                    if (snake.direction != "left") {
                        snake.direction = "right";
                    }
                    break;
            }
            //蛇向上的时候不能向下，向右时不能向左，向左时不能向右，向下时不能向上
        }
    }

}