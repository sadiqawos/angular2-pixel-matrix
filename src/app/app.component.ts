import { Component, ViewChild, ElementRef } from '@angular/core';
import { Pixel } from './pixel';
import { RGBValue } from './rgb';
import { Character } from './character';
import { ConvertBase } from './convertBase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('panel') panelView: ElementRef;
  panelWidth;
  columnCount;
  rowCount = 8;
  panelMatrix = [];
  colBuffer = [];
  ready = false;
  inputText = '';

  ngAfterViewInit() {
    this.panelWidth = this.panelView.nativeElement.offsetWidth;
    console.log("width", this.panelWidth);
    this.columnCount = this.roundNumber((this.panelWidth - 20) / 12, 0);
    console.log("pixel count", this.columnCount);

    for (var i = 0; i < this.columnCount; i++) {
      var r = [];
      for (var j = 0; j < this.rowCount; j++) {
        r.push(new Pixel());
      }
      this.panelMatrix.push(r);
    }
    setTimeout(() => {
      this.ready = true;
      setInterval(() => {
        this.shiftLeft();
        if (this.colBuffer.length > 0) {
          this.shiftNextChar();
        }
      }, 50);
    }, 1);
  }

  onResize(event) { //(window:resize)="onResize($event)
    console.log(event);
    console.log("width", event.srcElement.innerWidth);
    this.panelWidth = event.srcElement.innerWidth;
  }

  roundNumber(value, precision): any {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  shiftLeft() {
    for (var i = 1; i < this.panelMatrix.length; i++) {
      var col = this.panelMatrix[i];
      var next_col = this.panelMatrix[i - 1];
      for (var p = 0; p < this.rowCount; p++) {
        next_col[p].isActive = col[p].isActive;
      }
    }
  }

  shiftNextChar() {
    while (this.colBuffer.length > 0) {
      var c = this.colBuffer.pop().reverse();
      console.log(c);
      for (var p = 0; p < this.rowCount; p++) {
        setTimeout((index, char) => {
          console.log('lambda param:',p);
          this.shiftLeft();
          for (var i = 0; i < this.rowCount; i++) {
            this.panelMatrix[this.panelMatrix.length - 1][i].isActive = char[i][index];
          }
        }, 500, p, c);
      }
    }
  }

  appendChar() {
    if (this.inputText.length > 0) {
      var charArray = this.inputText.toString().split('').reverse();
      console.log(charArray)
      for (var i = 0; i < charArray.length; i++) {
        console.log(charArray[i]);
        var char = Character.map[charArray[i]];
        console.log(char);
        var chars = [];
        for (var j = 0; j < char.length - 1; j += 2) {
          var val = ConvertBase.hex2bin(char.substr(j, 2));
          if (val.length < 8) {
            while (val.length < 8) { val = '0' + val; }
          }
          chars.push(val.split('').reverse());
        }
        //console.log(chars);
        this.colBuffer.push(chars);
        //temp.push(...this.characterMap[charArray[i]]);
      }
    }
  }
}
