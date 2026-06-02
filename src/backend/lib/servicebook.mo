import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/servicebook";
import CommonTypes "../types/common";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

module {
  public type State = {
    items : List.List<Types.ServiceBookItem>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      items = List.empty<Types.ServiceBookItem>();
      nextId = { var val = 1 };
    };
  };

  public func addServiceBookItem(state : State, input : Types.ServiceBookItemInput) : Types.ServiceBookItem {
    let item : Types.ServiceBookItem = {
      id = state.nextId.val;
      step = input.step;
      title = input.title;
      content = input.content;
      createdAt = Time.now();
    };
    state.items.add(item);
    state.nextId.val += 1;
    item;
  };

  public func updateServiceBookItem(state : State, id : CommonTypes.Id, input : Types.ServiceBookItemInput) : ?Types.ServiceBookItem {
    var updated : ?Types.ServiceBookItem = null;
    state.items.mapInPlace(
      func(i) {
        if (i.id == id) {
          let u = { i with step = input.step; title = input.title; content = input.content };
          updated := ?u;
          u;
        } else { i };
      }
    );
    updated;
  };

  public func deleteServiceBookItem(state : State, id : CommonTypes.Id) : Bool {
    let before = state.items.size();
    let filtered = state.items.filter(func(i) { i.id != id });
    state.items.clear();
    state.items.append(filtered);
    state.items.size() < before;
  };

  public func listServiceBookItems(state : State) : [Types.ServiceBookItem] {
    let sorted = state.items.clone();
    sorted.sortInPlace(func(a, b) { Nat.compare(a.step, b.step) });
    sorted.toArray();
  };
  public func seedSampleData(state : State) {
    ignore addServiceBookItem(state, { step = 1; title = "The Gathering"; content = "We gather in the name of the Father, and of the Son, and of the Holy Spirit. Amen." });
    ignore addServiceBookItem(state, { step = 2; title = "Confession of Sin"; content = "Almighty God, our heavenly Father, we have sinned against you and against our neighbour in thought and word and deed, through negligence, through weakness, through our own deliberate fault. We are truly sorry and repent of all our sins. For the sake of your Son Jesus Christ who died for us, forgive us all that is past; and grant that we may serve you in newness of life to the glory of your name. Amen." });
    ignore addServiceBookItem(state, { step = 3; title = "Kyrie Eleison"; content = "Lord, have mercy upon us.\nChrist, have mercy upon us.\nLord, have mercy upon us." });
    ignore addServiceBookItem(state, { step = 4; title = "Gloria in Excelsis"; content = "Glory be to God on high, and in earth peace, goodwill towards men. We praise thee, we bless thee, we worship thee, we glorify thee, we give thanks to thee for thy great glory, O Lord God, heavenly King, God the Father Almighty." });
    ignore addServiceBookItem(state, { step = 5; title = "The Collect"; content = "Let us pray. [The Collect of the day is said here.] Amen." });
    ignore addServiceBookItem(state, { step = 6; title = "The Readings"; content = "A reading from [book and passage]. This is the word of the Lord. Thanks be to God." });
    ignore addServiceBookItem(state, { step = 7; title = "The Sermon"; content = "[The preacher delivers the sermon based on the scripture readings for the day.]" });
    ignore addServiceBookItem(state, { step = 8; title = "The Dismissal"; content = "Go in peace to love and serve the Lord. In the name of Christ. Amen." });
  };
};
