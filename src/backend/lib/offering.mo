import Debug "mo:core/Debug";
import Types "../types/offering";

module {
  public type State = {
    info : { var val : ?Types.OfferingInfo };
  };

  public func initState() : State {
    {
      info = { var val = null };
    };
  };

  public func getOfferingInfo(state : State) : ?Types.OfferingInfo {
    state.info.val;
  };

  public func updateOfferingInfo(state : State, info : Types.OfferingInfo) {
    state.info.val := ?info;
  };

  public func seedSampleData(state : State) {
    updateOfferingInfo(state, {
      mpesaName = "St James ACK Malaba";
      mpesaNumber = "0712345678";
      bankName = "Equity Bank";
      bankAccount = "0123456789";
      bankBranch = "Malaba Branch";
      instructions = "For M-Pesa: Send to 0712345678 (St James ACK Malaba). For bank transfers, use the account details above. Please include your name and purpose of giving in the reference.";
    });
  };
};
