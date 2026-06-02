import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import SundayProgramLib "../lib/sundayprogram";
import Types "../types/sundayprogram";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  programState : SundayProgramLib.State,
) {
  public shared ({ caller }) func addProgramItem(input : Types.ProgramItemInput) : async Types.ProgramItem {
    Debug.todo();
  };

  public shared ({ caller }) func updateProgramItem(id : CommonTypes.Id, input : Types.ProgramItemInput) : async ?Types.ProgramItem {
    Debug.todo();
  };

  public shared ({ caller }) func deleteProgramItem(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getProgramItem(id : CommonTypes.Id) : async ?Types.ProgramItem {
    Debug.todo();
  };

  public query func listProgramItems() : async [Types.ProgramItem] {
    Debug.todo();
  };
};
