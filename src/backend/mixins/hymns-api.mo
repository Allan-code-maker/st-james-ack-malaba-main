import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import HymnsLib "../lib/hymns";
import Types "../types/hymns";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  hymnsState : HymnsLib.State,
) {
  public shared ({ caller }) func addHymn(input : Types.HymnInput) : async Types.Hymn {
    Debug.todo();
  };

  public shared ({ caller }) func updateHymn(id : CommonTypes.Id, input : Types.HymnInput) : async ?Types.Hymn {
    Debug.todo();
  };

  public shared ({ caller }) func deleteHymn(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getHymn(id : CommonTypes.Id) : async ?Types.Hymn {
    Debug.todo();
  };

  public query func listHymns() : async [Types.Hymn] {
    Debug.todo();
  };

  public query func searchHymns(searchQuery : Text) : async [Types.Hymn] {
    Debug.todo();
  };
};
