
export interface EmojiResult {
  id: string;
  expression: string;
  imageUrl: string;
  isLoading: boolean;
  error?: string;
}

export enum ExpressionType {
  HAPPY = "Happy & Excited",
  SAD = "Sad & Crying",
  ANGRY = "Angry & Pouting",
  SURPRISED = "Surprised & Shocked",
  COOL = "Cool with Sunglasses"
}
