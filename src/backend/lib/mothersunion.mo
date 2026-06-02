import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/mothersunion";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type State = {
    items : List.List<Types.MothersItem>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      items = List.empty<Types.MothersItem>();
      nextId = { var val = 1 };
    };
  };

  public func addMothersItem(state : State, input : Types.MothersItemInput) : Types.MothersItem {
    let item : Types.MothersItem = {
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

  public func updateMothersItem(state : State, id : CommonTypes.Id, input : Types.MothersItemInput) : ?Types.MothersItem {
    var updated : ?Types.MothersItem = null;
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

  public func deleteMothersItem(state : State, id : CommonTypes.Id) : Bool {
    let before = state.items.size();
    let filtered = state.items.filter(func(i) { i.id != id });
    state.items.clear();
    state.items.append(filtered);
    state.items.size() < before;
  };

  public func getMothersItem(state : State, id : CommonTypes.Id) : ?Types.MothersItem {
    state.items.find(func(i) { i.id == id });
  };

  public func listMothersItems(state : State) : [Types.MothersItem] {
    state.items.toArray();
  };
  public func seedSampleData(state : State) {
    ignore addMothersItem(state, {
      category = "Meeting";
      title = "Monthly Meeting";
      description = "The Mothers Union monthly meeting is held on the first Sunday of every month after the main service. All women members are encouraged to attend.";
      date = null;
      leader = "Mrs. Mary Nasambu";
    });
    ignore addMothersItem(state, {
      category = "Program";
      title = "Fundraising Program";
      description = "Annual Mothers Union fundraising program to support church projects and community welfare. Date to be announced.";
      date = null;
      leader = "Mrs. Mary Nasambu";
    });
  };
};
