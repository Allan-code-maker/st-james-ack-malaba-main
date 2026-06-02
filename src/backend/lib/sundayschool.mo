import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/sundayschool";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type State = {
    classes : List.List<Types.Class>;
    materials : List.List<Types.LectureMaterial>;
    nextClassId : { var val : Nat };
    nextMaterialId : { var val : Nat };
  };

  public func initState() : State {
    {
      classes = List.empty<Types.Class>();
      materials = List.empty<Types.LectureMaterial>();
      nextClassId = { var val = 1 };
      nextMaterialId = { var val = 1 };
    };
  };

  public func addClass(state : State, input : Types.ClassInput) : Types.Class {
    let cls : Types.Class = {
      id = state.nextClassId.val;
      name = input.name;
      teacher = input.teacher;
      schedule = input.schedule;
      description = input.description;
      createdAt = Time.now();
    };
    state.classes.add(cls);
    state.nextClassId.val += 1;
    cls;
  };

  public func updateClass(state : State, id : CommonTypes.Id, input : Types.ClassInput) : ?Types.Class {
    var updated : ?Types.Class = null;
    state.classes.mapInPlace(
      func(c) {
        if (c.id == id) {
          let u = { c with name = input.name; teacher = input.teacher; schedule = input.schedule; description = input.description };
          updated := ?u;
          u;
        } else { c };
      }
    );
    updated;
  };

  public func deleteClass(state : State, id : CommonTypes.Id) : Bool {
    let before = state.classes.size();
    let filtered = state.classes.filter(func(c) { c.id != id });
    state.classes.clear();
    state.classes.append(filtered);
    state.classes.size() < before;
  };

  public func getClass(state : State, id : CommonTypes.Id) : ?Types.Class {
    state.classes.find(func(c) { c.id == id });
  };

  public func listClasses(state : State) : [Types.Class] {
    state.classes.toArray();
  };

  public func addLectureMaterial(state : State, input : Types.LectureMaterialInput) : Types.LectureMaterial {
    let mat : Types.LectureMaterial = {
      id = state.nextMaterialId.val;
      classId = input.classId;
      title = input.title;
      file = input.file;
      fileName = input.fileName;
      uploadedAt = Time.now();
    };
    state.materials.add(mat);
    state.nextMaterialId.val += 1;
    mat;
  };

  public func deleteLectureMaterial(state : State, id : CommonTypes.Id) : Bool {
    let before = state.materials.size();
    let filtered = state.materials.filter(func(m) { m.id != id });
    state.materials.clear();
    state.materials.append(filtered);
    state.materials.size() < before;
  };

  public func listLectureMaterials(state : State, classId : CommonTypes.Id) : [Types.LectureMaterial] {
    state.materials.filter(func(m) { m.classId == classId }).toArray();
  };
};
