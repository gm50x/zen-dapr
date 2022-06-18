export interface IAspect {
  execute(input: Request, output: any): any;
}
