import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  userName!: string;
  public quesarr: any = [];
  currentQues: number = 0;
  currentPoints: number = 0;
  counter = 60;
  correctAnswer = 0;
  incorrectAnswer = 0;
  interval$: any;
  isQuizCompleted = false;
  constructor(private QuesService: QuestionService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('name')!;
    this.allQues();
    this.startTimer();
  }

  allQues() {
    this.QuesService.getQuestion().subscribe((res) => {
      // this.questArr = res.questions
      console.log(res.questions);
      this.quesarr = res.questions;
    });
  }

  nextQues() {
    this.currentQues++;
  }

  prevQues() {
    this.currentQues--;
  }

  resetQuis() {
    this.currentQues = 0;
    this.counter = 60;
    this.currentPoints = 0;
  }
  answerQues(currentQno: number, option: any) {
    if (currentQno == this.quesarr.length) {
      this.isQuizCompleted = true;
      this.stopTimer();
    }
    if (option.correct) {
      this.currentPoints += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQues++;
        this.counter = 60;
      }, 1000);
    } else {
      this.currentPoints -= 10;
      setTimeout(() => {
        this.incorrectAnswer++;
        this.currentQues++;
        this.counter = 60;
      }, 1000);
    }
  }
  startTimer() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter == 0) {
        this.currentQues++;
        this.counter = 60;
        this.currentPoints -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopTimer() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetTimer() {
    this.stopTimer();
    this.counter = 60;
    this.startTimer();
  }
  restQuiz() {
    this.resetTimer();
    this.allQues();
    this.resetQuis();
  }
}
