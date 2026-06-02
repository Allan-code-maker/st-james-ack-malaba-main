import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/biblereadings";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type State = {
    readings : List.List<Types.BibleReading>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      readings = List.empty<Types.BibleReading>();
      nextId = { var val = 1 };
    };
  };

  public func addBibleReading(state : State, input : Types.BibleReadingInput) : Types.BibleReading {
    let reading : Types.BibleReading = {
      id = state.nextId.val;
      reference = input.reference;
      text = input.text;
      isReadingOfDay = false;
      createdAt = Time.now();
    };
    state.readings.add(reading);
    state.nextId.val += 1;
    reading;
  };

  public func updateBibleReading(state : State, id : CommonTypes.Id, input : Types.BibleReadingInput) : ?Types.BibleReading {
    var updated : ?Types.BibleReading = null;
    state.readings.mapInPlace(
      func(r) {
        if (r.id == id) {
          let u = { r with reference = input.reference; text = input.text };
          updated := ?u;
          u;
        } else { r };
      }
    );
    updated;
  };

  public func deleteBibleReading(state : State, id : CommonTypes.Id) : Bool {
    let before = state.readings.size();
    let filtered = state.readings.filter(func(r) { r.id != id });
    state.readings.clear();
    state.readings.append(filtered);
    state.readings.size() < before;
  };

  public func getBibleReading(state : State, id : CommonTypes.Id) : ?Types.BibleReading {
    state.readings.find(func(r) { r.id == id });
  };

  public func listBibleReadings(state : State) : [Types.BibleReading] {
    state.readings.toArray();
  };

  public func setReadingOfDay(state : State, id : CommonTypes.Id) : Bool {
    let found = state.readings.find(func(r) { r.id == id });
    switch (found) {
      case null { false };
      case (?_) {
        state.readings.mapInPlace(
          func(r) {
            { r with isReadingOfDay = (r.id == id) };
          }
        );
        true;
      };
    };
  };

  public func seedSampleData(state : State) {
    ignore addBibleReading(state, {
      reference = "Psalm 23:1-6";
      text = "The Lord is my shepherd; I shall not want.\nHe makes me lie down in green pastures. He leads me beside still waters.\nHe restores my soul. He leads me in paths of righteousness for his name's sake.\nEven though I walk through the valley of the shadow of death, I will fear no evil,\nfor you are with me; your rod and your staff, they comfort me.\nYou prepare a table before me in the presence of my enemies;\nyou anoint my head with oil; my cup overflows.\nSurely goodness and mercy shall follow me all the days of my life,\nand I shall dwell in the house of the Lord forever.";
    });
    let jn = addBibleReading(state, {
      reference = "John 3:16-17";
      text = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.\nFor God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.";
    });
    ignore setReadingOfDay(state, jn.id);
  };
};
