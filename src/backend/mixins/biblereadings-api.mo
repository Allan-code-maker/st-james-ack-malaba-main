import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import BibleReadingsLib "../lib/biblereadings";
import Types "../types/biblereadings";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  readingsState : BibleReadingsLib.State,
) {
  public shared ({ caller }) func addBibleReading(input : Types.BibleReadingInput) : async Types.BibleReading {
    Debug.todo();
  };

  public shared ({ caller }) func updateBibleReading(id : CommonTypes.Id, input : Types.BibleReadingInput) : async ?Types.BibleReading {
    Debug.todo();
  };

  public shared ({ caller }) func deleteBibleReading(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getBibleReading(id : CommonTypes.Id) : async ?Types.BibleReading {
    Debug.todo();
  };

  public query func listBibleReadings() : async [Types.BibleReading] {
    Debug.todo();
  };

  public shared ({ caller }) func setReadingOfDay(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };
};
