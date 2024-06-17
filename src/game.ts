import { hangmanWords } from "./wordlist";
import inquirer from "inquirer";
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import * as path from "path";

const exec = promisify(execCallback);

class Hangman {
  private word: string;
  private guesses: Set<string>;
  private incorrectGuesses: Set<string>;
  private maxIncorrect: number;

  constructor() {
    this.word = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    this.guesses = new Set();
    this.incorrectGuesses = new Set();
    this.maxIncorrect = 6;
  }

  public async play() {
    while (
      this.incorrectGuesses.size < this.maxIncorrect &&
      !this.isWordGuessed()
    ) {
      console.log(this.getWordDisplay());
      const guess = await this.promptGuess();

      if (guess.length === 1) {
        if (this.word.includes(guess)) {
          this.guesses.add(guess);
          await this.playSound("correct");
        } else if (
          this.incorrectGuesses.has(guess) ||
          this.guesses.has(guess)
        ) {
          console.log(`You already guessed "${guess}"!`);
        } else {
          this.incorrectGuesses.add(guess);
          await this.playSound("incorrect");
        }
      } else {
        if (guess === this.word) {
          this.guesses = new Set(this.word.split(""));
          break;
        } else if (guess === "q!") {
          console.log("Quitting game...");
          process.exit(0);
        } else {
          console.log(`Incorrect full word guess: "${guess}"`);
          this.incorrectGuesses.add(guess);
          await this.playSound("incorrect");
        }
      }

      console.clear();

      console.log(this.getHangmanDisplay());
    }

    if (this.isWordGuessed()) {
      console.log(`🎉 Congratulations! You guessed the word: ${this.word} 🎉`);
      console.log(await this.getRandomQuote());
    } else {
      console.log(`💀 Game over! The word was: ${this.word} 💀`);
      console.log(await this.getRandomQuote());
    }
  }

  private getWordDisplay(): string {
    return this.word
      .split("")
      .map((letter) => (this.guesses.has(letter) ? letter : "_"))
      .join(" ")
      .concat(
        `\n\nIncorrect Guesses: ${[...this.incorrectGuesses].join(", ")}\n`
      );
  }

  private isWordGuessed(): boolean {
    return this.word.split("").every((letter) => this.guesses.has(letter));
  }

  private async promptGuess(): Promise<string> {
    const response = await inquirer.prompt([
      {
        name: "letter",
        message: "Guess a letter:",
        validate: (input: string) =>
          input.length > 0 && /[a-z]/i.test(input)
            ? true
            : "Please enter a single letter or if you want to quit, type 'q!' (reference to vim quit command 😉).",
      },
    ]);
    return response.letter.toLowerCase();
  }

  private getHangmanDisplay(): string {
    const stages = [
      `
       ------
       |    |
            |
            |
            |
            |
      =========`,
      `
       ------
       |    |
       🤪   |
            |
            |
            |
      =========`,
      `
       ------
       |    |
       🤪   |
       |    |
            |
            |
      =========`,
      `
       ------
       |    |
       🤪   |
      /|    |
            |
            |
      =========`,
      `
       ------
       |    |
       🤪   |
      /|\\   |
            |
            |
      =========`,
      `
       ------
       |    |
       🤪   |
      /|\\   |
      /     |
            |
      =========`,
      `
       ------
       |    |
       🤪   |
      /|\\   |
      / \\   |
            |
      =========`,
    ];
    return stages[this.incorrectGuesses.size].concat("\n");
  }

  private async playSound(type: "correct" | "incorrect") {
    const soundPath = path.resolve(__dirname, `../public/${type}.mp3`);
    try {
      exec(`afplay ${soundPath}`);
    } catch (error) {
      console.error(`Error playing sound: ${error}`);
    }
  }

  private async getRandomQuote(): Promise<string> {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data: any = await response.json();
      return `💬 Random Quote: "${data.content}" - ${data.author}`;
    } catch (error) {
      return "💬 Could not fetch a random quote.";
    }
  }
}
export default Hangman;
