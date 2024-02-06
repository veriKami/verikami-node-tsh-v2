[verikami-node-tsh-v2](../README.md) / [Modules](../modules.md) / app/app

# Module: app/app

## Table of contents

### Functions

- [default](app_app.md#default)

## Functions

### default

▸ **default**(`req`, `res`): `any`

Express instance itself is a request handler, which could be invoked without
third argument.

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` \| `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `ServerResponse`\<`IncomingMessage`\> \| `Response`\<`any`, `Record`\<`string`, `any`\>, `number`\> |

#### Returns

`any`

#### Defined in

src/app/app.ts:12

▸ **default**(`req`, `res`, `next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>, `number`\> |
| `next` | `NextFunction` |

#### Returns

`void`

#### Defined in

src/app/app.ts:12
