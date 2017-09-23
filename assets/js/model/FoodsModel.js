function FoodModel(_id, _pos) {
    this.id = _id;
    this.pos = _pos;
}

function FoodsModel()
{
    this.last_id = 0;
    this.food = [];
    this.max_foods = MAX_FOODS;

    this.make = function()
    {
        if(this.food.length < MAX_FOODS) {
            var pos;
            do {
                pos = G_model.randomPos();
            } while(!G_model.isEmpty(pos));

            this.food.push(new FoodModel('food-'+this.last_id++, pos));
        }
    }

    this.checkPos = function(_pos)
    {
        var trovato = false;
        var i = 0;
        while(!trovato && i < this.food.length) {
            if(this.food[i].pos.equal(_pos)) {
                trovato = true;
            } else {
                i++;
            }
        }

        return trovato;
    }

    this.eat = function(_pos)
    {
        var mangiato = false;
        var i = 0;
        while(!mangiato && i < this.food.length) {
            if(this.food[i].pos.equal(_pos)) {
                this.food.splice(i, 1);
                mangiato = true;
            } else {
                i++;
            }
        }

        return mangiato;
    }

    this.exists = function(_id)
    {
        var i = 0;
        var trovato = false;
        while (!trovato && i < this.food.length) {
            if (this.food[i].id === _id) {
                trovato = this.food[i];
            } else {
                i++;
            }
        }
        return trovato;
    }
}