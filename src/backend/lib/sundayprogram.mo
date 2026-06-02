import List "mo:core/List";
import Types "../types/sundayprogram";
import CommonTypes "../types/common";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

module {
  public type State = {
    items : List.List<Types.ProgramItem>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      items = List.empty<Types.ProgramItem>();
      nextId = { var val = 1 };
    };
  };

  public func addProgramItem(state : State, input : Types.ProgramItemInput) : Types.ProgramItem {
    let item : Types.ProgramItem = {
      id = state.nextId.val;
      time = input.time;
      activity = input.activity;
      order = input.order;
      createdAt = Time.now();
    };
    state.items.add(item);
    state.nextId.val += 1;
    item;
  };

  public func updateProgramItem(state : State, id : CommonTypes.Id, input : Types.ProgramItemInput) : ?Types.ProgramItem {
    var updated : ?Types.ProgramItem = null;
    state.items.mapInPlace(
      func(p) {
        if (p.id == id) {
          let u = { p with time = input.time; activity = input.activity; order = input.order };
          updated := ?u;
          u;
        } else { p };
      }
    );
    updated;
  };

  public func deleteProgramItem(state : State, id : CommonTypes.Id) : Bool {
    let before = state.items.size();
    let filtered = state.items.filter(func(p) { p.id != id });
    state.items.clear();
    state.items.append(filtered);
    state.items.size() < before;
  };

  public func getProgramItem(state : State, id : CommonTypes.Id) : ?Types.ProgramItem {
    state.items.find(func(p) { p.id == id });
  };

  public func listProgramItems(state : State) : [Types.ProgramItem] {
    let sorted = state.items.clone();
    sorted.sortInPlace(func(a, b) { Nat.compare(a.order, b.order) });
    sorted.toArray();
  };

  public func seedSampleData(state : State) {
    ignore addProgramItem(state, { time = "8:30 AM"; activity = "Preparation and Quiet Prayer"; order = 1 });
    ignore addProgramItem(state, { time = "9:00 AM"; activity = "Opening Hymn"; order = 2 });
    ignore addProgramItem(state, { time = "9:10 AM"; activity = "Bible Reading"; order = 3 });
    ignore addProgramItem(state, { time = "9:20 AM"; activity = "Sermon"; order = 4 });
    ignore addProgramItem(state, { time = "10:15 AM"; activity = "Offering"; order = 5 });
    ignore addProgramItem(state, { time = "10:30 AM"; activity = "Intercessory Prayers"; order = 6 });
    ignore addProgramItem(state, { time = "11:00 AM"; activity = "Closing Hymn and Benediction"; order = 7 });
  };
};
