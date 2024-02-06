[verikami-node-tsh-v2](../README.md) / [Modules](../modules.md) / middlewares/m.error

# Module: middlewares/m.error

## Table of contents

### Functions

- [errorHandler](middlewares_m_error.md#errorhandler)
- [errorNotFound](middlewares_m_error.md#errornotfound)

## Functions

### errorHandler

▸ **errorHandler**(`err`, `req`, `res`, `next`): `void`

(*) ERROR HANDLING

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |
| `next` | `NextFunction` |

#### Returns

`void`

#### Defined in

src/middlewares/m.error.ts:18

___

### errorNotFound

▸ **errorNotFound**(`req`, `res`, `next`): `void`

(404) ERROR HANDLING

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |
| `next` | `NextFunction` |

#### Returns

`void`

#### Defined in

src/middlewares/m.error.ts:9
