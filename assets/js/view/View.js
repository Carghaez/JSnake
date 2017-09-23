function View(_grid_width, _grid_height)
{
    this.$board;
    this.$snake;
    this.grid_width = _grid_width;
    this.grid_height = _grid_height;

    this.init = function()
    {
        this.$board = document.getElementById('board');
        this.$board.style.width = this.getWidth() + 'px';
        this.$board.style.height = this.getHeight() + 'px';

        this.$snake = document.createElement('div');
        this.$snake.id = 'snake';
        this.$snake.style.width = this.grid_width + 'px';
        this.$snake.style.height = this.grid_height + 'px';
        this.$board.appendChild(this.$snake);
        this.updateSnake();
    }

    this.getWidth = function()
    {
        return G_model.cols * this.grid_width;
    }

    this.getHeight = function()
    {
        return G_model.rows * this.grid_height;
    }

    this.update = function()
    {
        this.updateSnake();
        this.updateFoods();
        this.updateScore();
    }

    this.updateSnake = function()
    {
        var pos = G_model.snake.getPos();
        this.$snake.style.left = (pos.x * this.grid_width) + 'px';
        this.$snake.style.top = (pos.y * this.grid_height) + 'px';
        switch (G_model.snake.getDir())
        {
            case DIR_UP:
                this.$snake.style.transform = 'rotate(180deg)';
                break;
            case DIR_RIGHT:
                this.$snake.style.transform = 'rotate(270deg)';
                break;
            case DIR_LEFT:
                this.$snake.style.transform = 'rotate(90deg)';
                break;
            case DIR_DOWN:
                this.$snake.style.transform = 'rotate(0deg)';
                break;
        }
        for (var i = 0; i < G_model.snake.lastBodyId(); i++) {
            body = G_model.snake.existsBody('body-'+i);
            if(body) {
                var tmp = document.getElementById(body.getId());
                if(!tmp) {
                    var temp = document.createElement('div');
                    temp.id = body.getId();
                    temp.classList.add('body');
                    temp.style.width = this.grid_width-2 + 'px';
                    temp.style.height = this.grid_height-2 + 'px';
                    temp.style.left = (body.getPos().x*this.grid_width) + 'px';
                    temp.style.top = (body.getPos().y*this.grid_height) + 'px';
                    this.$board.appendChild(temp);
                }else{
                    tmp.style.left = (body.getPos().x*this.grid_width) + 'px';
                    tmp.style.top = (body.getPos().y*this.grid_height) + 'px';
                }
            } else {
                var tmp = document.getElementById('body-'+i);
                if(tmp) {
                   tmp.parentNode.removeChild(tmp);
                }
            }
        }
    }

    this.updateFoods = function()
    {
        var food;
        for (var i = 0; i < G_model.foods.last_id; i++) {
            food = G_model.foods.exists('food-'+i);
            if(food) {
                if(!document.getElementById(food.id)) {
                    var temp = document.createElement('div');
                    temp.id = food.id;
                    temp.classList.add('food-'+this.randomFoodType());
                    temp.style.width = this.grid_width + 'px';
                    temp.style.height = this.grid_height + 'px';
                    temp.style.left = (food.pos.x*this.grid_width) + 'px';
                    temp.style.top = (food.pos.y*this.grid_height) + 'px';
                    this.$board.appendChild(temp);
                }
            } else {
                var tmp = document.getElementById('food-'+i);
                if(tmp) {
                   tmp.parentNode.removeChild(tmp);
                }
            }
        }
    }

    this.updateScore = function()
    {
        document.getElementById('score').textContent = 'Speed: '+ (1 /G_controller.getInterval()).toFixed(4)+'\nScore: '+ G_model.snake.length();
        if(G_controller.status == GAME_OVER) {
            document.getElementById('score').textContent += '\nGame Over!';
        }
    }

    this.randomFoodType = function()
    {
        return parseInt(Math.random()*FOOD_TIPES);
    }
}