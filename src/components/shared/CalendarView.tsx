// CalendarView.tsx
import classNames from 'classnames';
import Badge from '@/components/ui/Badge';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { useRef } from 'react';

type EventColors = Record<
    string,
    {
        bg: string;
        text: string;
        dot: string;
    }
>;

interface CalendarViewProps extends CalendarOptions {
    wrapperClass?: string;
    eventColors?: (colors: EventColors) => EventColors;
}

const defaultColorList: Record<
    string,
    {
        bg: string;
        text: string;
        dot: string;
    }
> = {
    red: { bg: 'bg-red-50 dark:bg-red-500/10', text: 'text-red-500 dark:text-red-100', dot: 'bg-red-500' },
    orange: { bg: 'bg-orange-50 dark:bg-orange-500/10', text: 'text-orange-500 dark:text-orange-100', dot: 'bg-orange-500' },
    green: { bg: 'bg-green-50 dark:bg-green-500/10', text: 'text-green-500 dark:text-green-100', dot: 'bg-green-500' },
    blue: { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-500 dark:text-blue-100', dot: 'bg-blue-500' },
    yellow: { bg: 'bg-yellow-50 dark:bg-yellow-500/10', text: 'text-yellow-500 dark:text-yellow-100', dot: 'bg-yellow-500' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-500 dark:text-purple-100', dot: 'bg-purple-500' },
};

const CalendarView = (props: CalendarViewProps) => {
    const calendarRef = useRef<any>(null);

    const {
        wrapperClass,
        eventColors = () => defaultColorList,
        ...rest
    } = props;

    // Navigate to today's date
    const goToToday = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.today();
    };

    return (
        <div className={classNames('calendar', wrapperClass)}>
            <FullCalendar
                ref={calendarRef} // Attach ref to the FullCalendar component
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'todayButton,dayGridMonth,timeGridWeek,timeGridDay,prev,next',
                }}
                customButtons={{
                    todayButton: {
                        text: 'Today',
                        click: goToToday,
                    },
                }}
                eventContent={(arg) => {
                    const { extendedProps } = arg.event;
                    const { isEnd, isStart } = arg;
                    const eventColor = extendedProps.eventColor
                        ? (eventColors(defaultColorList) || defaultColorList)[extendedProps.eventColor]
                        : null;

                    return (
                        <div
                            className={classNames(
                                'custom-calendar-event',
                                eventColor ? eventColor.bg : '',
                                eventColor ? eventColor.text : '',
                                isEnd && !isStart && '!rounded-tl-none !rounded-bl-none !rtl:rounded-tr-none !rtl:rounded-br-none',
                                !isEnd && isStart && '!rounded-tr-none !rounded-br-none !rtl:rounded-tl-none !rtl:rounded-bl-none'
                            )}
                        >
                            {!(isEnd && !isStart) && (
                                <Badge
                                    className={classNames(
                                        'mr-1 rtl:ml-1',
                                        eventColor ? eventColor.dot : ''
                                    )}
                                />
                            )}
                            {!(isEnd && !isStart) && <span>{arg.timeText}</span>}
                            <span className="font-semibold ml-1 rtl:mr-1">{arg.event.title}</span>
                        </div>
                    );
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                {...rest}
            />
        </div>
    );
};

export default CalendarView;
