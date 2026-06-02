import Debug "mo:core/Debug";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/hymns";
import CommonTypes "../types/common";

module {
  public type State = {
    hymns : List.List<Types.Hymn>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      hymns = List.empty<Types.Hymn>();
      nextId = { var val = 1 };
    };
  };

  public func addHymn(state : State, input : Types.HymnInput) : Types.Hymn {
    let hymn : Types.Hymn = {
      id = state.nextId.val;
      number = input.number;
      title = input.title;
      lyrics = input.lyrics;
      createdAt = Time.now();
    };
    state.hymns.add(hymn);
    state.nextId.val += 1;
    hymn;
  };

  public func updateHymn(state : State, id : CommonTypes.Id, input : Types.HymnInput) : ?Types.Hymn {
    var updated : ?Types.Hymn = null;
    state.hymns.mapInPlace(
      func(h) {
        if (h.id == id) {
          let u = { h with number = input.number; title = input.title; lyrics = input.lyrics };
          updated := ?u;
          u;
        } else { h };
      }
    );
    updated;
  };

  public func deleteHymn(state : State, id : CommonTypes.Id) : Bool {
    let before = state.hymns.size();
    let filtered = state.hymns.filter(func(h) { h.id != id });
    state.hymns.clear();
    state.hymns.append(filtered);
    state.hymns.size() < before;
  };

  public func getHymn(state : State, id : CommonTypes.Id) : ?Types.Hymn {
    state.hymns.find(func(h) { h.id == id });
  };

  public func listHymns(state : State) : [Types.Hymn] {
    state.hymns.toArray();
  };

  public func searchHymns(state : State, searchQuery : Text) : [Types.Hymn] {
    let q = searchQuery.toLower();
    state.hymns.filter(
      func(h) {
        h.title.toLower().contains(#text q) or h.lyrics.toLower().contains(#text q);
      }
    ).toArray();
  };

  public func seedSampleData(state : State) {
    ignore addHymn(state, { number = 1; title = "Holy Holy Holy"; lyrics = "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy! Merciful and mighty!\nGod in three Persons, blessed Trinity!" });
    ignore addHymn(state, { number = 33; title = "To God Be the Glory"; lyrics = "To God be the glory, great things He hath taught us,\nGreat things He hath done, and great our rejoicing\nThrough Jesus the Son;\nBut purer and higher and greater will be\nOur wonder, our rapture, when Jesus we see." });
    ignore addHymn(state, { number = 56; title = "What a Friend We Have in Jesus"; lyrics = "What a Friend we have in Jesus,\nAll our sins and griefs to bear!\nWhat a privilege to carry\nEverything to God in prayer!" });
    ignore addHymn(state, { number = 100; title = "All Things Bright and Beautiful"; lyrics = "All things bright and beautiful,\nAll creatures great and small,\nAll things wise and wonderful:\nThe Lord God made them all." });
    ignore addHymn(state, { number = 120; title = "Abide With Me"; lyrics = "Abide with me; fast falls the eventide;\nThe darkness deepens; Lord with me abide.\nWhen other helpers fail and comforts flee,\nHelp of the helpless, O abide with me." });
  };
};
