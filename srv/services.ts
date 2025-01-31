import { ApplicationService, Request } from "@sap/cds";
import { setTorresAsWinner } from "./handlers/set-torres-as-winner";

export default class OscarService extends ApplicationService {
  public async init() {
    this.on("setTorresAsWinner", setTorresAsWinner);

    await super.init();
  }
}
