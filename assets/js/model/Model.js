function Model(_cols, _rows)
{
    this.cols = _cols;
    this.rows = _rows;
    this.snake = null;
    this.foods = null;

    this.randomPos = function()
    {
        var posX = parseInt(Math.random() * this.cols);
        var posY = parseInt(Math.random() * this.rows);
        return new Position(posX, posY);
    }

    this.centerPos = function()
    {
        var posX = parseInt(this.cols/2);
        var posY = parseInt(this.rows/2);
        //console.log('Gridsize:', this.cols, this.rows);
        return new Position(posX, posY);
    }

    this.checkGameOver = function()
    {
        return this.snake.checkBodyPos(this.snake.getPos());
    }

    this.makeMove = function(pos, direction)
    {
        switch (direction)
        {
            case DIR_LEFT:
                pos.x--;
                if(pos.x < 0) {
                    pos.x = (this.cols-1);
                }
                break;
            case DIR_RIGHT:
                pos.x++;
                if(pos.x > (this.cols-1)) {
                    pos.x = 0;
                }
                break;
            case DIR_UP:
                pos.y--;
                if(pos.y < 0) {
                    pos.y = (this.rows-1);
                }
                break;
            case DIR_DOWN:
                pos.y++;
                if(pos.y > (this.rows-1)) {
                    pos.y = 0;
                }
                break;
        }
        return pos;
    }

    this.hasEaten = function()
    {
        return this.foods.eat(this.snake.getPos());
    }

    this.update = function()
    {
        this.snake.move(this.hasEaten());
    }

    this.changeSnakeDir = function(dir)
    {
        this.snake.changeDir(dir);
    }

    this.isEmpty = function(_pos)
    {
        if(this.foods.checkPos(_pos))
            return false;

        if(this.snake.checkPos(_pos))
            return false;

        return true;
    }

    this.init = function(_nick)
    {
        this.snake = new SnakeModel(_nick, this.centerPos());
        this.foods = new FoodsModel();
        this.snake.randomDir();
    }
}