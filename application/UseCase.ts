export abstract class UseCase<InputType, OutputType> {
  abstract execute(input: InputType): OutputType;
}
