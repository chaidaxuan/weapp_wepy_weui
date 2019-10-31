import { Observable } from "rxjs";

interface T {

}
declare var Object: ObjectConstructor;

export declare class HttpHeaders {
    /**
     * Internal map of lowercase header names to values.
     */
    private headers;
    /**
     * Internal map of lowercased header names to the normalized
     * form of the name (the form seen first).
     */
    private normalizedNames;
    /**
     * Complete the lazy initialization of this object (needed before reading).
     */
    private lazyInit;
    /**
     * Queued updates to be materialized the next initialization.
     */
    private lazyUpdate;
    /**  Constructs a new HTTP header object with the given values.*/
    constructor(headers?: string | {
        [name: string]: string | string[];
    });
    /**
     * Checks for existence of a header by a given name.
     *
     * @param name The header name to check for existence.
     *
     * @returns Whether the header exits.
     */
    has(name: string): boolean;
    /**
     * Returns the first header value that matches a given name.
     *
     * @param name The header name to retrieve.
     *
     * @returns A string if the header exists, null otherwise
     */
    get(name: string): string | null;
    /**
     * Returns the names of the headers.
     *
     * @returns A list of header names.
     */
    keys(): string[];
    /**
     * Returns a list of header values for a given header name.
     *
     * @param name The header name from which to retrieve the values.
     *
     * @returns A string of values if the header exists, null otherwise.
     */
    getAll(name: string): string[] | null;
    /**
     * Appends a new header value to the existing set of
     * header values.
     *
     * @param name The header name for which to append the values.
     *
     * @returns A clone of the HTTP header object with the value appended.
     */
    append(name: string, value: string | string[]): HttpHeaders;
    /**
     * Sets a header value for a given name. If the header name already exists,
     * its value is replaced with the given value.
     *
     * @param name The header name.
     * @param value Provides the value to set or overide for a given name.
     *
     * @returns A clone of the HTTP header object with the newly set header value.
     */
    set(name: string, value: string | string[]): HttpHeaders;
    /**
     * Deletes all header values for a given name.
     *
     * @param name The header name.
     * @param value The header values to delete for a given name.
     *
     * @returns A clone of the HTTP header object.
     */
    delete(name: string, value?: string | string[]): HttpHeaders;
    private maybeSetNormalizedName;
    private init;
    private copyFrom;
    private clone;
    private applyUpdate;
}
export declare class HttpParams {
    private map;
    private encoder;
    private updates;
    private cloneFrom;
    constructor(options?: HttpParamsOptions);
    /**
     * Check whether the body has one or more values for the given parameter name.
     */
    has(param: string): boolean;
    /**
     * Get the first value for the given parameter name, or `null` if it's not present.
     */
    get(param: string): string | null;
    /**
     * Get all values for the given parameter name, or `null` if it's not present.
     */
    getAll(param: string): string[] | null;
    /**
     * Get all the parameter names for this body.
     */
    keys(): string[];
    /**
     * Construct a new body with an appended value for the given parameter name.
     */
    append(param: string, value: string): HttpParams;
    /**
     * Construct a new body with a new value for the given parameter name.
     */
    set(param: string, value: string): HttpParams;
    /**
     * Construct a new body with either the given value for the given parameter
     * removed, if a value is given, or all values for the given parameter removed
     * if not.
     */
    delete(param: string, value?: string): HttpParams;
    /**
     * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
     * separated by `&`s.
     */
    toString(): string;
    private clone;
    private init;
}
export declare interface HttpParameterCodec {
    encodeKey(key: string): string;
    encodeValue(value: string): string;
    decodeKey(key: string): string;
    decodeValue(value: string): string;
}
declare interface HttpParamsOptions {
    /**
     * String representation of the HTTP params in URL-query-string format. Mutually exclusive with
     * `fromObject`.
     */
    fromString?: string;
    /** Object map of the HTTP params. Mutually exclusive with `fromString`. */
    fromObject?: {
        [param: string]: string | string[];
    };
    /** Encoding codec used to parse and serialize the params. */
    encoder?: HttpParameterCodec;
}
export declare class HttpClient {
    // public post(url: String, param: any, options?: any): Observable<Object> {
    //     return null;
    // }
    post(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<Object>;
}


