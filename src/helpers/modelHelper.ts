import { TestStatus } from "../helpers/TestStatus";

export class ModelHelper {

  public static NUMBER_OF_QUESTIONS: number = 10;
  public static TEST_TIME_IN_MS = 36000000;

  public static testStatus: number[] = [
    TestStatus.CREATED,
    TestStatus.STARTED,
    TestStatus.COMPLETED,
    TestStatus.EXPIRED
  ];

  public static updateFields(source, destination) {
    for (var prop in destination) {
      if (prop == "_id" || prop == "__v" || prop == "createdAt") {
        continue;
      }

      if (destination.hasOwnProperty) {
        source[prop] = destination[prop];
      }
    }
    return source;
  }

  public static calcNumQuestions(type: string): number {
    if (type === "Math SAT 2") {
      this.NUMBER_OF_QUESTIONS = 50;
    }
    else if (type == "Physics SAT") {
      this.NUMBER_OF_QUESTIONS = 75;
    }
    else if (type == "Biology SAT") {
      this.NUMBER_OF_QUESTIONS = 60;
    }
    else if (type == "US History SAT") {
      this.NUMBER_OF_QUESTIONS = 45;
    }
    else if (type == "AP Stats") {
      this.NUMBER_OF_QUESTIONS = 40;
    }
    else if (type == "AP Biology") {
      this.NUMBER_OF_QUESTIONS = 60;
    }
    else if (type == "AP Physics 1") {
      this.NUMBER_OF_QUESTIONS = 50;
    }
    else if (type == "SQL Certification") {
      this.NUMBER_OF_QUESTIONS = 20;
    }
    else if (type == "Javascript") {
      this.NUMBER_OF_QUESTIONS = 20;
    }
    else {
      this.NUMBER_OF_QUESTIONS = 2;
    }
    return this.NUMBER_OF_QUESTIONS
  }

  public static random(min: number, max: number): number {
    let doudle: number = min + ((Math.random() * 4583) % (max - min));
    return (doudle - (doudle % 1));
  }

  public static isTimeOver(testStartDate: Date): boolean {
    if (testStartDate && ModelHelper.timeDiffInMiliSec(testStartDate) > ModelHelper.TEST_TIME_IN_MS) {
      return true;
    }

    return false;
  }

  private static timeDiffInMiliSec(date: Date): number {
    // Convert both dates to milliseconds
    var date1_ms: number = date.getTime();
    var date2_ms: number = Date.now();

    // Calculate the difference in milliseconds
    return date2_ms - date1_ms;
  }

  public static remainingTestTimeInSecond(startTime: Date): number {
    let difference = ModelHelper.timeDiffInMiliSec(startTime);

    return ModelHelper.TEST_TIME_IN_MS / 1000 - difference / 1000;
  }
}