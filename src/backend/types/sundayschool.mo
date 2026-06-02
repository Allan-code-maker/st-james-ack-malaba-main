import CommonTypes "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Class = {
    id : CommonTypes.Id;
    name : Text;
    teacher : Text;
    schedule : Text;
    description : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type ClassInput = {
    name : Text;
    teacher : Text;
    schedule : Text;
    description : Text;
  };

  public type LectureMaterial = {
    id : CommonTypes.Id;
    classId : CommonTypes.Id;
    title : Text;
    file : Storage.ExternalBlob;
    fileName : Text;
    uploadedAt : CommonTypes.Timestamp;
  };

  public type LectureMaterialInput = {
    classId : CommonTypes.Id;
    title : Text;
    file : Storage.ExternalBlob;
    fileName : Text;
  };
};
