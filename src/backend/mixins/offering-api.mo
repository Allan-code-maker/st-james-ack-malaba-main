import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import OfferingLib "../lib/offering";
import Types "../types/offering";

mixin (
  accessControlState : AccessControl.AccessControlState,
  offeringState : OfferingLib.State,
) {
  public query func getOfferingInfo() : async ?Types.OfferingInfo {
    Debug.todo();
  };

  public shared ({ caller }) func updateOfferingInfo(info : Types.OfferingInfo) : async () {
    Debug.todo();
  };
};
