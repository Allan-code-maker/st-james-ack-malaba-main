import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import MensLib "../lib/mensassociation";
import Types "../types/mensassociation";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  mensState : MensLib.State,
) {
  public shared ({ caller }) func addMensItem(input : Types.MensItemInput) : async Types.MensItem {
    Debug.todo();
  };

  public shared ({ caller }) func updateMensItem(id : CommonTypes.Id, input : Types.MensItemInput) : async ?Types.MensItem {
    Debug.todo();
  };

  public shared ({ caller }) func deleteMensItem(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getMensItem(id : CommonTypes.Id) : async ?Types.MensItem {
    Debug.todo();
  };

  public query func listMensItems() : async [Types.MensItem] {
    Debug.todo();
  };
};
