//: ----------------------------------------------------------------------------
/** server.ts */
/** ------------------------------------------------------------------------- */
import app from "./app/app";

const port:number = process.env.PORT as unknown as number || 8000;

/** SERVER */
//: ----------------------------------------------------------------------------
const server = app.listen(port, async () => {
    const s: any = await server.address();
    if (s.family == "IPv6") s.address = `[${s.address}]`;
    console.log("==================================");
    console.log(`SERVER 🍋 ${s.family} 🍋 http://${s.address}:${s.port}`);
    console.log("==================================");
});
