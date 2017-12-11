import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

 class Game extends React.Component{
     constructor(props){
         super(props)
         this.state = {
            xIsWin : null,
            xTurn: true,
            arr: [[{"value":null, "isDisabled":false, "hiddenElement":1},
                    {"value":null, "isDisabled": false, "hiddenElement":2},
                    {"value":null, "isDisabled": false, "hiddenElement":3}],
                    [{"value":null, "isDisabled":false, "hiddenElement":4},
                    {"value":null, "isDisabled": false, "hiddenElement":5},
                    {"value":null, "isDisabled": false, "hiddenElement":6}],
                    [{"value":null, "isDisabled":false, "hiddenElement":7},
                    {"value":null, "isDisabled": false, "hiddenElement":8},
                    {"value":null, "isDisabled": false, "hiddenElement":9}]]    
         }

         this.rowsSumEquals = this.rowsSumEquals.bind(this);
         this.columnSumEquals = this.columnSumEquals.bind(this);
         this.columnSum = this.columnSum.bind(this);
         this.firstDiagnolSum = this.firstDiagnolSum.bind(this);
         this.secondDiagnolSum = this.secondDiagnolSum.bind(this);
         this.diagnolsSumEquals = this.diagnolsSumEquals.bind(this);
     }

     onClickMain(hiddenvalue) {
         const newArr = this.state.arr.map((row) =>{
             
            const newRow = row.map((element) =>{
                if (hiddenvalue != element.hiddenElement) {
                    return element
                } else {
                    if (this.state.xTurn){
                        this.setState({xTurn: false});
                        return {"value":1, "isDisabled":true}
                    } else {
                        this.setState({xTurn: true});
                        return {"value":-1, "isDisabled":true}
                    }
                }
            });
            return newRow
         })

         //for checking is the value of state has changed or not because setState is async.
        //  this.setState({ arr: newArr }, () => console.log(this.state) )
        this.setState({ arr: newArr })
        if (this.state.xTurn == false){
            this.rowsSumEquals(newArr,-3, "0");
            this.columnSumEquals(newArr,-3, "0");
            this.diagnolsSumEquals(newArr,-3, "0");
        } else {
            this.rowsSumEquals(newArr,3, "X");
            this.columnSumEquals(newArr,3, "X");
            this.diagnolsSumEquals(newArr,3, "X");
        }
     }
    //  get results for rows
     rowsSumEquals(matrix, maxValue, turn){
         const self = this;
         matrix.forEach(function(row){
            var rowSum = 0;
            row.forEach(function(element){
                if (element.value != null){
                rowSum += element.value;
                }
            });
            if (rowSum == maxValue){
                if (turn == "X"){
                    self.setState({xIsWin: true});
                } else {
                    self.setState({xIsWin: false});
                }
            }
         });
     }

    // this function is used for finding colums function
    columnSum(matrix,col){
        var colSum = 0;
        for (var i=0; i<matrix.length; i++){
           colSum += matrix[i][col].value;
        }
        return colSum
    }
    // get results for columns
     columnSumEquals(matrix, maxValue, turn){
        const self = this;        
        var firstCol = this.columnSum(matrix,0);
        var secondCol = this.columnSum(matrix,1);
        var thirdCol = this.columnSum(matrix, 2);
        
        if (firstCol == maxValue ||secondCol == maxValue || thirdCol == maxValue){
            if (turn == "X"){
                self.setState({xIsWin: true});
            } else {
                self.setState({xIsWin: false});
            }
        }
     }

     firstDiagnolSum(matrix){
        var diagnolSum = 0
        matrix.forEach(function(i,j){
            // console.log(i[j].value);
            diagnolSum += i[j].value;
        });
        return diagnolSum
     }
     secondDiagnolSum(matrix){
        var counter = matrix.length -1;
        var diagnolSum=0
        matrix.forEach(function(i){
            diagnolSum += i[counter].value;
            counter -= 1;
        });
        return diagnolSum

     }
    //  get results for diagnols
    diagnolsSumEquals(matrix, maxValue, turn){
        const self = this;        
        var firstDiagnol = this.firstDiagnolSum(matrix);
        // console.log(firstDiagnol);
        var secondDiagnol = this.secondDiagnolSum(matrix);

        if ( firstDiagnol == maxValue || secondDiagnol == maxValue){
            if (turn == "X"){
                self.setState({xIsWin: true});
                alert(turn ,"'s has won!");
            // const gameEndedArray =self.state.arr.map((row) =>{
                
            //     const newRow = row.map((element) =>{
            //         element.isDisabled = true;
            //         return element
            //     });
            //     return newRow
            // })
            // self.setState({ arr: gameEndedArray });
            } else {
                self.setState({xIsWin: false});
                alert(turn ,"'s has won!");
            }   
        }
    }

     render(){
         return(
            <div className="game">
                <div className="game-board">
                    <Board arr={this.state.arr} onClick={this.onClickMain.bind(this)} xTurn={this.state.xTurn} xIsWin={this.state.xIsWin}/>
                </div>
            </div>
         );
     }
 }

function Board(props){
    var status;
    if (props.xIsWin == null){
        status = "It's " + (props.xTurn == true ? 'X': 0) + "'s Turn !";        
    } else {
        if (props.xIsWin == true){
            status = "X's has won !";
        } else if ((props.xIsWin == true)) {
            status = "0's has won !";
        } else {
            status = "Game has ended no one has won !";
        }
    }
    return (
        <div className="container">
            <h2>{status}</h2>
            {
                props.arr.map((row) => {
                    return (
                        <div className="row">
                            {
                                row.map((e) => {
                                    // console.log(e.hiddenElement);
                                    return <Square className="square" value={e.value} onClick={props.onClick} isDisabled={e.isDisabled} hiddenElement={e.hiddenElement}/>
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

function Square(props) {
    return (
      <input className="square" value={props.value == null ? null: (props.value == 1 ? "X": 0)} type="button" onClick={() => {props.onClick(props.hiddenElement)}} disabled={props.isDisabled}>
      </input>
    );
  }

//for calling a class like function with this we can connect our DOM with js file
ReactDom.render(
    <Game/>,
    document.getElementById('root')

)