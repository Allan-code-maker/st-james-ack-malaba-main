import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/sermons";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type State = {
    sermons : List.List<Types.Sermon>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      sermons = List.empty<Types.Sermon>();
      nextId = { var val = 1 };
    };
  };

  public func addSermon(state : State, input : Types.SermonInput) : Types.Sermon {
    let sermon : Types.Sermon = {
      id = state.nextId.val;
      preacher = input.preacher;
      theme = input.theme;
      date = input.date;
      scriptureRef = input.scriptureRef;
      notes = input.notes;
      createdAt = Time.now();
    };
    state.sermons.add(sermon);
    state.nextId.val += 1;
    sermon;
  };

  public func updateSermon(state : State, id : CommonTypes.Id, input : Types.SermonInput) : ?Types.Sermon {
    var updated : ?Types.Sermon = null;
    state.sermons.mapInPlace(
      func(s) {
        if (s.id == id) {
          let u = { s with preacher = input.preacher; theme = input.theme; date = input.date; scriptureRef = input.scriptureRef; notes = input.notes };
          updated := ?u;
          u;
        } else { s };
      }
    );
    updated;
  };

  public func deleteSermon(state : State, id : CommonTypes.Id) : Bool {
    let before = state.sermons.size();
    let filtered = state.sermons.filter(func(s) { s.id != id });
    state.sermons.clear();
    state.sermons.append(filtered);
    state.sermons.size() < before;
  };

  public func getSermon(state : State, id : CommonTypes.Id) : ?Types.Sermon {
    state.sermons.find(func(s) { s.id == id });
  };

  public func listSermons(state : State) : [Types.Sermon] {
    state.sermons.toArray();
  };

  public func seedSampleData(state : State) {
    ignore addSermon(state, {
      preacher = "Rev. James Ochieng";
      theme = "Walking in Faith";
      date = 1_748_044_800_000_000_000;
      scriptureRef = "Hebrews 11:1-6";
      notes = "Faith is the assurance of things hoped for and the conviction of things not seen. Join us as we explore how to walk boldly in faith.";
    });
  };
};
