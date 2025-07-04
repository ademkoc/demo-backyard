/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This is the the request body for creating new car.
 */
export interface CarNewFormBody {
  /**
   * Car brand
   */
  brand: string;
  /**
   * Car model
   */
  model: string;
  /**
   * Car model year
   */
  year: string;
  /**
   * Car mileage
   */
  km: string;
}
/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This is the the request body for editing customer.
 */
export interface CustomerEditFormBody {
  /**
   * The birthdate of the customer DD/MM/YYYY
   */
  birthdate?: string;
  /**
   * client_id for this client. May be omitted for edits and must not change from the original
   */
  customerId?: string;
  /**
   * The name of the customer
   */
  name?: string;
  /**
   * The surname of the customer
   */
  surname?: string;
}
/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This is the the request body for creating new customer.
 */
export interface CustomerNewFormBody {
  /**
   * The birthdate of the customer DD/MM/YYYY
   */
  birthdate: string;
  /**
   * The name of the customer
   */
  name: string;
  /**
   * The surname of the customer
   */
  surname: string;
}
/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Pagination {
  offset?: number;
  limit?: number;
  additionalProperties?: never;
}
/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This is the the request body for renting car.
 */
export interface RentNewFormBody {
  /**
   * Customer id
   */
  customer_id: number;
  /**
   * Car id
   */
  car_id: number;
}
