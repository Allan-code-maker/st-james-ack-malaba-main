import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import SermonsLib "../lib/sermons";
import Types "../types/sermons";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  sermonsState : SermonsLib.State,
) {
  public shared ({ caller }) func addSermon(input : Types.SermonInput) : async Types.Sermon {
    Debug.todo();
  };

  public shared ({ caller }) func updateSermon(id : CommonTypes.Id, input : Types.SermonInput) : async ?Types.Sermon {
    Debug.todo();
  };

  public shared ({ caller }) func deleteSermon(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getSermon(id : CommonTypes.Id) : async ?Types.Sermon {
    Debug.todo();
  };

  public query func listSermons() : async [Types.Sermon] {
    Debug.todo();
  };
};
