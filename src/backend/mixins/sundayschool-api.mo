import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import SundaySchoolLib "../lib/sundayschool";
import Types "../types/sundayschool";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  schoolState : SundaySchoolLib.State,
) {
  public shared ({ caller }) func addClass(input : Types.ClassInput) : async Types.Class {
    Debug.todo();
  };

  public shared ({ caller }) func updateClass(id : CommonTypes.Id, input : Types.ClassInput) : async ?Types.Class {
    Debug.todo();
  };

  public shared ({ caller }) func deleteClass(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getClass(id : CommonTypes.Id) : async ?Types.Class {
    Debug.todo();
  };

  public query func listClasses() : async [Types.Class] {
    Debug.todo();
  };

  public shared ({ caller }) func addLectureMaterial(input : Types.LectureMaterialInput) : async Types.LectureMaterial {
    Debug.todo();
  };

  public shared ({ caller }) func deleteLectureMaterial(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func listLectureMaterials(classId : CommonTypes.Id) : async [Types.LectureMaterial] {
    Debug.todo();
  };
};
