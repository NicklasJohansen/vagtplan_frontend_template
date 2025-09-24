import { PeriodDTO } from "~/apiClient/apiClient";
import { ChevronDown, ChevronUp } from "lucide-react";
interface PeriodTimelineProps {
  selectedPeriod: PeriodDTO;
}

export const PeriodTimeline = ({ selectedPeriod }: PeriodTimelineProps) => {
  const startDateLive = new Date(selectedPeriod.startDate!);
  const endDateLive = new Date(selectedPeriod.endDate!);

  const today = new Date()
  today.setHours(0, 0, 0, 0);



  // Phase lengths in days (+1 to include end date)
  const livePhaseLengthDays =
    (endDateLive.getTime() - startDateLive.getTime()) / (1000 * 60 * 60 * 24) + 1;
  

  const fourWeekRuleDate = new Date(startDateLive);
  fourWeekRuleDate.setDate(startDateLive.getDate() - 28);

  // upper limit for before and after block to ensure that the live phase doesnt get to compressed
  const MaxDaysForBeforeAndAfterBlock = 150;
  const MaxDaysForBeforeAndAfterBlockInMs = MaxDaysForBeforeAndAfterBlock * 24 * 60 * 60 * 1000;
  const isBefore = today < startDateLive;
  const isAfter = today > endDateLive;

  let startDate = isBefore ? today.getTime() : startDateLive.getTime()
  let endDate = isAfter ? today.getTime() : endDateLive.getTime();


  if (isBefore) {
    if (today > fourWeekRuleDate) {
      startDate = fourWeekRuleDate.getTime();
    } else {
      const diff = startDate - today.getTime();
      startDate = startDate - Math.min(diff, MaxDaysForBeforeAndAfterBlockInMs);
    }

  }

  if (isAfter) {
    const diff = today.getTime() - endDateLive.getTime();
    endDate = endDateLive.getTime() + Math.min(diff, MaxDaysForBeforeAndAfterBlockInMs);
  }

  const totalLengthInDays =
    (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;




  // Calculate percentage for current date
  const elapsedDays = (today.getTime() - startDate) / (1000 * 60 * 60 * 24);
  let currentDatePct = (elapsedDays / totalLengthInDays) * 100;
  currentDatePct = Math.min(Math.max(currentDatePct, 0), 100);

  // Calculate percentage for four week rule
  const fourWeekRuleDiff = (fourWeekRuleDate.getTime() - startDate) / (1000 * 60 * 60 * 24);
  let fourWeekRulePct = (fourWeekRuleDiff / totalLengthInDays) * 100;
  fourWeekRulePct = Math.min(Math.max(fourWeekRulePct, 0), 100);

  // calculate percentage for live start date
  const startDateLivePct = (startDateLive.getTime() - startDate) / (1000 * 60 * 60 * 24);
  let thirdCutOffPct = (startDateLivePct / totalLengthInDays) * 100;
  thirdCutOffPct = Math.min(Math.max(thirdCutOffPct, 0), 100);

  // calculate percentage for live end date
  const endDateLivePct = (endDateLive.getTime() - startDate) / (1000 * 60 * 60 * 24) + 1;
  let fourthCutOffPct = (endDateLivePct / totalLengthInDays) * 100;
  fourthCutOffPct = Math.min(Math.max(fourthCutOffPct, 0), 100);

  // used to define the size of the actual blocks on the timeline
  const livePhaseBlockPct = (livePhaseLengthDays / totalLengthInDays) * 100;
  const beforeLivePhaseBlockPct = (Math.min((startDateLive.getTime() - startDate) / (1000 * 60 * 60 * 24), MaxDaysForBeforeAndAfterBlock) / totalLengthInDays) * 100
  const afterLivePhaseBlockPct = isAfter
    ? (Math.min((today.getTime() - endDateLive.getTime()) / (1000 * 60 * 60 * 24), MaxDaysForBeforeAndAfterBlock) / totalLengthInDays) * 100
    : 0;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("da-DK", { day: "2-digit", month: "2-digit" });

  return (
<div className="mt-8">
  <div className="relative w-full">
    {/* Phase bar */}
    <div className="relative flex w-full h-8 border border-gray-300 rounded overflow-hidden font-sans">
      {/* Before period */}
      {beforeLivePhaseBlockPct > 0 && (
        <div
          className="text-white text-sm font-medium text-center leading-8 bg-gray-400"
          style={{ width: `${beforeLivePhaseBlockPct}%` }}
        >
          Før periode
        </div>
      )}

      {/* Live phase */}
      <div
        className="text-white text-sm font-medium text-center leading-8 bg-green-500"
        style={{ width: `${livePhaseBlockPct}%` }}
      >
        Live
      </div>

      {/* After period */}
      {afterLivePhaseBlockPct > 0 && (
        <div
          className="text-white text-sm font-medium text-center leading-8 bg-gray-400"
          style={{ width: `${afterLivePhaseBlockPct}%` }}
        >
          Efter periode
        </div>
      )}


    </div>
    {/* Today marker inside timeline*/}
    {today.getTime() < endDate && today.getTime() > startDate && (
    <>
    <div
      className="absolute top-0 left-0 h-full flex flex-col items-center"
      style={{ left: `${currentDatePct}%`, transform: "translateX(-50%)" }}
    >
      <div className="bg-black" style={{ width: '2px', height: '90%' }} />
      <div className="text-xs text-gray-700">Nu</div>
      <div className="bg-black" style={{ width: '2px', height: '90%'  }} />
    </div>
    </>
    )}

    {/* Four-week rule marker */}
    {isBefore && (
    <>
    <div
      className="absolute bottom-full text-[11px] mb-1.5 text-gray-700 flex flex-col items-center"
      style={{ left: `${fourWeekRulePct}%`, transform: "translateX(-50%)" }}
    >
      <span>Deadline for offentliggørelse</span>
      <span>{formatDate(fourWeekRuleDate)}</span>
    </div>
    <div
      className="absolute bottom-full  text-black text-xl -mb-1.5"
      style={{ left: `${fourWeekRulePct}%`, transform: "translateX(-50%)" }}
    >
      <ChevronDown size={20}/>
    </div>
    </>
    )}

    {/* Today Marker if today is on the far left or far right of the timeline */}
    {(today.getTime() >= endDate || today.getTime() <= startDate)  && (
    <>
    <div
      className="absolute top-full mt-1 text-xs text-gray-700"
      style={{ left: `${currentDatePct}%`, transform: "translateX(-50%)" }}
    >
      {formatDate(today)}
    </div>
    </>
    )}


    {/* Start and end date labels for live phase */}
    <div
      className="absolute top-full mt-1 text-xs text-gray-700"
      style={{ left: `${beforeLivePhaseBlockPct}%`, transform: "translateX(-50%)" }}
    >
      {formatDate(startDateLive)}
    </div>
    <div
      className="absolute top-full mt-1 text-xs text-gray-700"
      style={{ left: `${beforeLivePhaseBlockPct + livePhaseBlockPct}%`, transform: "translateX(-50%)" }}
    >
      {formatDate(endDateLive)}
    </div>
  </div>
</div>

  );
};



