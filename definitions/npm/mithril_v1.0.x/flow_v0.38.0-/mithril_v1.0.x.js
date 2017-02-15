
declare type Mithril$Lifecycle<A, S> = {
    oninit?: (vnode: Mithril$Vnode<A, S>) => void,
    oncreate?: (vnode: Mithril$VnodeDOM<A, S>) => void,
    onbeforeremove?: (vnode: Mithril$VnodeDOM<A, S>) => Promise<any> | void,
    onremove?: (vnode: Mithril$VnodeDOM<A, S>) => void,
    onbeforeupdate?: (vnode: Mithril$Vnode<A, S>, old: Mithril$Vnode<A, S>) => boolean,
    onupdate?: (vnode: Mithril$VnodeDOM<A, S>) => void
}

declare type Mithril$Component<A, S> = {
  view: (vnode: Mithril$Vnode<A, S>) => Mithril$Vnode<A, S>
    | null | void | (Mithril$Vnode<A, S> | null | void)[] & Mithril$Lifecycle<A, S>
}

declare type Mithril$Vnode<A, S> = {
  tag: string | Mithril$Component<A, S>,
  attrs: A,
  state: S,
  key?: string,
  children?: Mithril$Vnode<any, any>,
  events?: any,
}

declare type Mithril$VnodeDOM<A, S>= {
    dom: Element,
    domSize?: number
} & Mithril$Vnode<A, S>

// Children Vnode definition
declare type Mithril$Child = Mithril$Vnode<any, any>
  | string
  | number
  | boolean
  | null
  | typeof undefined
declare type Mithril$ChildArray = Array<Mithril$Child>
declare type Mithril$Children = Mithril$Child | Mithril$ChildArray;


declare interface Mithril$RouteResolver {
    render?: (vnode: Mithril$Vnode<any, any>) => Mithril$Children,
    onmatch?: (
        args: any,
        requestedPath: string)
        => Mithril$Component<any, any> | Promise<Mithril$Component<any, any>> | void
}

declare type Mithril$RouteDefs = {
    [url: string]: Mithril$Component<any, any> | Mithril$RouteResolver
}

declare type Mithril$RouteOptions = {
    replace?: boolean,
        state?: any,
        title?: string
}

declare interface Mithril$Route {
    (element: HTMLElement, defaultRoute: string, routes: Mithril$RouteDefs): void,
    get(): string,
    set(route: string, data?: any, options?: Mithril$RouteOptions): void,
    prefix(urlFragment: string): void,
    link(vnode: Mithril$Vnode<any, any>): (e: Event) => void,
    param(name?: string): any
}

declare interface Mithril$Mount {
  (element: Element, component: Mithril$Component<any, any> | null): void;
}

declare interface Mithril$Stream<T>{
    (): T,
    (value: T): T,
    map(f: (current: T) => Mithril$Stream<T> | T | void): Mithril$Stream<T>,
    map<U>(f: (current: T) => Mithril$Stream<U> | U): Mithril$Stream<U>,
    of (val?: T): Mithril$Stream<T>,
    ap<U>(f: Mithril$Stream<(value: T) => U>): Mithril$Stream<U>,
    end: Mithril$Stream<boolean>
}

declare interface Mithril$WithAttr {
  (name: string, stream: Mithril$Stream<any>, thisArg?: any): (e: {
      currentTarget: any,
      [p: string]: any
  }) => boolean,
  (name: string, callback: (value: any) => void, thisArg?: any): (e: {
      currentTarget: any,
      [p: string]: any
  }) => boolean
}

declare interface Mithril$Redraw {
    (): void
}

declare type Mithril$RequestOptions<T> = {
    method?: string,
    data?: any,
    async?: boolean,
    user?: string,
    password?: string,
    withCredentials?: boolean,
    config?: (xhr: XMLHttpRequest) => void,
    headers?: any,
    type?: any,
    serialize?: (data: any) => string,
    deserialize?: (str: string) => T,
    extract?: (xhr: XMLHttpRequest, options: Mithril$RequestOptions<T>) => string,
    useBody?: boolean,
    background?: boolean
}

declare type Mithril$RequestOptionsAll<T>= {
    url: string
} & Mithril$RequestOptions<T>

declare interface Mithril$Request {
  <T>(options: Mithril$RequestOptionsAll<T>): Promise<T>,
  <T>(url: string, options?: Mithril$RequestOptions<T>): Promise<T>
}

declare type Mithril$JsonpOptions = {
    data?: any,
    type?: any,
    callbackName?: string,
    callbackKey?: string,
    background?: boolean
}

declare type Mithril$JsonpOptionsAll = {
    url: string
} & Mithril$JsonpOptions


declare interface Mithril$Jsonp {
  <T>(options: Mithril$JsonpOptionsAll): Promise<T>,
  <T>(url: string, options?: Mithril$JsonpOptions): Promise<T>
}

declare interface Mithril$ParseQueryString {
    (queryString: string): any
}

declare interface Mithril$BuildQueryString {
    (values: {
        [p: string]: any
    }): string
}

declare interface Mithril$Hyperscript {
  (selector: string, ...children: any): Mithril$Vnode<any, any>,

  <A, S>(component: Mithril$Component<A, S>,
    a?: (A & Mithril$Lifecycle<A, S>) | Mithril$Children,
    ...children: Mithril$Children[]): Mithril$Vnode<A, S>,

  fragment(attrs: any, children: any): Mithril$Vnode<any, any>,

  trust(html: string): Mithril$Vnode<any, any>
}

declare interface Mithril$Render {
  (el: Element, vnodes: Mithril$Children): void
}

declare interface Mithril$Static {
  route: Mithril$Route,
  mount: Mithril$Mount,
  withAttr: Mithril$WithAttr,
  render: Mithril$Render,
  redraw: Mithril$Redraw,
  request: Mithril$Request,
  jsonp: Mithril$Jsonp,
  parseQueryString: Mithril$ParseQueryString,
  buildQueryString: Mithril$BuildQueryString,
  version: string,

  // Hyperscript
  (selector: string, ...children: any): Mithril$Vnode<any, any>,
  <A, S>(component: Mithril$Component<A, S>,
    a?: (A & Mithril$Lifecycle<A, S>) | Mithril$Children,
    ...children: Mithril$Children[]): Mithril$Vnode<A, S>,
  fragment(attrs: any, children: any): Mithril$Vnode<any, any>,
  trust(html: string): Mithril$Vnode<any, any>,
}

declare module 'mithril' {
  declare var m: Mithril$Static;
  declare module.exports: typeof m;
}

declare module 'mithril/hyperscript' {
  declare var h: Mithril$Hyperscript;
  declare module.exports: typeof h
}
declare module 'mithril/mount' {
  declare var m: Mithril$Mount;
  declare module.exports: typeof m
}
declare module 'mithril/route' {
  declare var r: Mithril$Route;
  declare module.exports: typeof r
}

declare interface Mithril$RequestService {
  request: Mithril$Request,
  jsonp: Mithril$Jsonp
}

declare module 'mithril/request' {
  declare var r: Mithril$RequestService;
  declare module.exports: typeof r
}

declare interface Mithril$RenderService {
  render: Mithril$Render
}

declare module 'mithril/render' {
  declare var r: Mithril$RenderService;
  declare module.exports: typeof r
}

declare interface Mithril$RedrawService {
  redraw: Mithril$Redraw,
  render: Mithril$Render
}

declare module 'mithril/redraw' {
  declare var r: Mithril$RedrawService;
  declare module.exports: typeof r
}
declare module 'mithril/util/withAttr' {
  declare var withAttr: Mithril$WithAttr;
  declare module.exports: typeof withAttr
}

declare type Mithril$StreamCombiner<T>= (...streams: any[]) => T;
declare interface Mithril$StreamFactory {
  <T>(val?: T): Mithril$Stream<T>,
  combine<T>(
      combiner: Mithril$StreamCombiner<T>,
      streams: Mithril$Stream<any>[]): Mithril$Stream<T>,
  merge(streams: Mithril$Stream<any>[]): Mithril$Stream<any[]>,
  HALT: any
}

declare module 'mithril/stream' {
  declare var s: Mithril$StreamFactory;
  declare module.exports: typeof s
}
