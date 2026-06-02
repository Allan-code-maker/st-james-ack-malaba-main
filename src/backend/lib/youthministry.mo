import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/youthministry";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type State = {
    items : List.List<Types.YouthItem>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      items = List.empty<Types.YouthItem>();
      nextId = { var val = 1 };
    };
  };

  public func addYouthItem(state : State, input : Types.YouthItemInput) : Types.YouthItem {
    let item : Types.YouthItem = {
      id = state.nextId.val;
      category = input.category;
      title = input.title;
      description = input.description;
      date = input.date;
      leader = input.leader;
      createdAt = Time.now();
    };
    state.items.add(item);
    state.nextId.val += 1;
    item;
  };

  public func updateYouthItem(state : State, id : CommonTypes.Id, input : Types.YouthItemInput) : ?Types.YouthItem {
    var updated : ?Types.YouthItem = null;
    state.items.mapInPlace(
      func(i) {
        if (i.id == id) {
          let u = { i with category = input.category; title = input.title; description = input.description; date = input.date; leader = input.leader };
          updated := ?u;
          u;
        } else { i };
      }
    );
    updated;
  };

  public func deleteYouthItem(state : State, id : CommonTypes.Id) : Bool {
    let before = state.items.size();
    let filtered = state.items.filter(func(i) { i.id != id });
    state.items.clear();
    state.items.append(filtered);
    state.items.size() < before;
  };

  public func getYouthItem(state : State, id : CommonTypes.Id) : ?Types.YouthItem {
    state.items.find(func(i) { i.id == id });
  };

  public func listYouthItems(state : State) : [Types.YouthItem] {
    state.items.toArray();
  };
  public func seedSampleData(state : State) {
    ignore addYouthItem(state, {
      category = "Fellowship";
      title = "Youth Fellowship";
      description = "Weekly youth fellowship meeting for prayer, Bible study, and fellowship. All youth between ages 13-30 are welcome.";
      date = null;
      leader = "Br. Daniel Wekesa";
    });
    ignore addYouthItem(state, {
      category = "Music";
      title = "Youth Choir";
      description = "The St. James Youth Choir rehearses every Saturday at 3:00 PM. New members are always welcome.";
      date = null;
      leader = "Sr. Grace Akinyi";
    });
  };
};
