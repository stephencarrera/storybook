export interface NgModuleMetadata {
  declarations?: Array<any>;
  entryComponents?: Array<any>;
  imports?: Array<any>;
  schemas?: Array<any>;
  providers?: Array<any>;
}

export interface ICollection {
  [p: string]: any;
}

export interface NgStory {
  component?: any;
  props: ICollection;
  propsMeta?: ICollection;
  moduleMetadata?: NgModuleMetadata;
  template?: string;
  styles?: string[];
}

export interface NgError {
  message: string;
  stack: string;
}

export type NgProvidedData = NgStory | NgError;

export interface IContext {
  [p: string]: any;
}

export type IGetStoryWithContext = (context: IContext) => NgStory;

export type IRenderStoryFn = (
  story: IGetStoryWithContext,
  context: IContext,
  reRender?: boolean
) => void;
export type IRenderErrorFn = (error: Error) => void;
