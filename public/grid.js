import {Cell} from "./cell.js";
console.log("hehshs")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";

export class Grid {

    rows 
    columns
    cells
    generation
    alive_neighbors
    alive_cells
    cell_counter

    constructor() {
        this.generation = 0;
        this.alive_cells = 0;
        this.cell_counter = 20;
        this.cells = {};
        this.rows = 100;
        this.columns = 100;
        this.status = false;
        this.initial();
        this.alive_neighbors = 0;
    }

    
    initial() {
        this.alive_neighbors = 0;
        this.generation++;
            for (let row = 0; row < this.rows; row++) {
                this.cells[row] = [];
                for(let column = 0; column < this.columns; column++) {
                    this.cells[row][column] = new Cell(ctx, row, column);
                    let status = Math.floor(Math.random() * 2);
                    if (status === 1) {
                        this.cells[row][column].status = true;
                        this.cells[row][column].show_cell();
                        this.alive_cells++;
                    }
                    else {this.cells[row][column].status = false};
                } 
            }    
        this.draw();
    }

    count_alive_neighbors(row, column) {
        this.alive_neighbors = 0;
        console.log("alive neighbors", this.generation)
        for (let i = row - 1; i <= row + 1; i++) {
            for (let a = column - 1; a <= column + 1; a++) {
                if (!(i === row && a === column)) { 
                    let i_step = i;
                    let a_step = a;
                        if (i_step < 0) {
                            i_step += this.rows; 
                        }
                        if  (a_step < 0) {
                            a_step += this.columns;
                        }
                        if (i_step > this.rows) {
                            i_step -= this.rows;
                        }
                        if (a_step > this.columns) {
                            a_step -= this.columns;
                        }
                        if (this.cells[i_step] && this.cells[i_step][a_step] && this.cells[i_step][a_step].status) {
                            this.alive_neighbors++;
                        }
                }
                    }
                
                }
            
        return this.alive_neighbors   
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    draw() {
        this.generation++
        for (let row = 0; row < this.rows; row++) {  
            for (let column = 0; column < this.columns; column++) {
                this.alive_neighbors = this.count_alive_neighbors(row, column);
                let cell = this.cells[row][column]
                let cell_status = this.cells[row][column].status;
                if (cell_status === false && this.alive_neighbors === 3) {
                    this.dead_with_three_alives(cell);
                }
                else if (cell_status && this.alive_neighbors <= 2) {
                    this.alive_with_less_than_two_alives(cell);
                }
                else if (cell_status === false && this.alive_neighbors === 2 || this.alive_neighbors === 2) {
                    this.alive_with_two_or_three_alive(cell);
                }
                else if (cell_status && this.alive_neighbors <= 3) {
                    this.alive_with_more_than_three_alives(cell);
                }      
            }
        }
        if (this.generation < 20) {
            this.sleep(1000).then(() => {this.draw()});
        } else {return console.log("finished")
        }  
    }

    dead_with_three_alives(cell) {
        cell.status = true;
        cell.show_cell();
    }

    alive_with_less_than_two_alives(cell) {
        cell.status = false;
        cell.hide_cell();
    }

    alive_with_two_or_three_alive(cell) {
        cell.status = true;
        cell.show_cell();
    }

    alive_with_more_than_three_alives(cell) {
        cell.status = false;
        cell.hide_cell();
    }
}
let game_of_life = new Grid();
