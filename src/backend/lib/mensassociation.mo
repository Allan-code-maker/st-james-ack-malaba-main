import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/mensassociation";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type State = {
    items : List.List<Types.MensItem>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      items = List.empty<Types.MensItem>();
      nextId = { var val = 1 };
    };
  };

  public func addMensItem(state : State, input : Types.MensItemInput) : Types.MensItem {
    let item : Types.MensItem = {
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

  public func updateMensItem(state : State, id : CommonTypes.Id, input : Types.MensItemInput) : ?Types.MensItem {
    var updated : ?Types.MensItem = null;
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

  public func deleteMensItem(state : State, id : CommonTypes.Id) : Bool {
    let before = state.items.size();
    let filtered = state.items.filter(func(i) { i.id != id });
    state.items.clear();
    state.items.append(filtered);
    state.items.size() < before;
  };

  public func getMensItem(state : State, id : CommonTypes.Id) : ?Types.MensItem {
    state.items.find(func(i) { i.id == id });
  };

  public func listMensItems(state : State) : [Types.MensItem] {
    state.items.toArray();
  };
  public func seedSampleData(state : State) {
    ignore addMensItem(state, {
      category = "Fellowship";
      title = "Men's Breakfast";
      description = "Monthly men's breakfast fellowship held on the last Saturday of the month at 8:00 AM. Come for food, fellowship, and the Word.";
      date = null;
      leader = "Mr. Peter Simiyu";
    });
    ignore addMensItem(state, {
      category = "Service";
      title = "Community Service";
      description = "The Men's Association organizes community service projects to support Malaba town and the surrounding areas.";
      date = null;
      leader = "Mr. Peter Simiyu";
    });
  };
};
