import nc from "next-connect"
import Checker from "../dbtest"

const handler = nc();

handler.get(Checker);
export default handler;

