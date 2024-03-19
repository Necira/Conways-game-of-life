export class Cell {
    height
    width
    status
    position_row
    position_column
    size
    ctx
    constructor(ctx, row, column) {
        this.height = 20;
        this.width = 20;
        this.status = false;
        this.position_row = row;
        this.position_column = column;
        this.ctx = ctx;
    }
    
    show_cell() {
        console.log("show")
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.position_row,this.position_column,this.width,this.height);
    }

    hide_cell() {
        console.log("hide")
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.position_row,this.position_column,this.width,this.height);
    }
}

