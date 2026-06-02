import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

import HymnsLib "lib/hymns";
import BibleReadingsLib "lib/biblereadings";
import AnnouncementsLib "lib/announcements";
import SermonsLib "lib/sermons";
import SundayProgramLib "lib/sundayprogram";
import SundaySchoolLib "lib/sundayschool";
import YouthLib "lib/youthministry";
import MothersLib "lib/mothersunion";
import MensLib "lib/mensassociation";
import OfferingLib "lib/offering";
import ServiceBookLib "lib/servicebook";

import HymnsApi "mixins/hymns-api";
import BibleReadingsApi "mixins/biblereadings-api";
import AnnouncementsApi "mixins/announcements-api";
import SermonsApi "mixins/sermons-api";
import SundayProgramApi "mixins/sundayprogram-api";
import SundaySchoolApi "mixins/sundayschool-api";
import YouthApi "mixins/youthministry-api";
import MothersApi "mixins/mothersunion-api";
import MensApi "mixins/mensassociation-api";
import OfferingApi "mixins/offering-api";
import ServiceBookApi "mixins/servicebook-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object Storage (for Sunday School lecture uploads)
  include MixinObjectStorage();

  // Domain state
  let hymnsState = HymnsLib.initState();
  let readingsState = BibleReadingsLib.initState();
  let announcementsState = AnnouncementsLib.initState();
  let sermonsState = SermonsLib.initState();
  let programState = SundayProgramLib.initState();
  let schoolState = SundaySchoolLib.initState();
  let youthState = YouthLib.initState();
  let mothersState = MothersLib.initState();
  let mensState = MensLib.initState();
  let offeringState = OfferingLib.initState();
  let serviceBookState = ServiceBookLib.initState();

  // API mixins
  include HymnsApi(accessControlState, hymnsState);
  include BibleReadingsApi(accessControlState, readingsState);
  include AnnouncementsApi(accessControlState, announcementsState);
  include SermonsApi(accessControlState, sermonsState);
  include SundayProgramApi(accessControlState, programState);
  include SundaySchoolApi(accessControlState, schoolState);
  include YouthApi(accessControlState, youthState);
  include MothersApi(accessControlState, mothersState);
  include MensApi(accessControlState, mensState);
  include OfferingApi(accessControlState, offeringState);
  include ServiceBookApi(accessControlState, serviceBookState);
};
