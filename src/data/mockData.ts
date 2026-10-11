import type { User, Project, ProjectStatus, AlertItem } from '../types';
import { getDaysRemaining, formatDate } from '../utils/dateUtils';

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    fullName: 'Arun Kumar Shukla',
    loginName: 'arun.shukla',
    role: 'Administrator',
    status: 'Active',
    initials: 'AS',
    createdDate: '12 Jan 2026',
  },
  {
    id: 'u2',
    fullName: 'Divya Prakash Upadhyay',
    loginName: 'divya.upadhyay',
    role: 'Project manager',
    status: 'Active',
    initials: 'DU',
    createdDate: '15 Jan 2026',
  },
  {
    id: 'u3',
    fullName: 'Dayasindhu',
    loginName: 'dayasindhu',
    role: 'Member',
    status: 'Active',
    initials: 'DA',
    createdDate: '01 Feb 2026',
  },
  {
    id: 'u4',
    fullName: 'Bhavana',
    loginName: 'bhavana',
    role: 'Member',
    status: 'Active',
    initials: 'BH',
    createdDate: '05 Feb 2026',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  // 1. P101 - Slipping (Overdue by 3 days: due Oct 21)
  {
    code: 'P101',
    name: 'Clearance of 27 radome assembly',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p101-m1',
        code: 'M1',
        name: 'Material receiving & incoming visual audit',
        startDate: '2026-09-01',
        endDate: '2026-09-07',
        targetDate: '2026-09-07',
        actualDate: '2026-09-06',
        durationCategory: 'Weekly',
        assignedTo: 'Dayasindhu',
        status: 'Completed',
      },
      {
        id: 'p101-m2',
        code: 'M2',
        name: 'Mandrel precision dimensional calibration',
        startDate: '2026-09-08',
        endDate: '2026-09-17',
        targetDate: '2026-09-17',
        actualDate: '2026-09-17',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Completed',
      },
      {
        id: 'p101-m3',
        code: 'M3',
        name: 'Sub-assembly structural alignment verification',
        startDate: '2026-09-18',
        endDate: '2026-09-28',
        targetDate: '2026-09-28',
        actualDate: '2026-09-27',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'Completed',
      },
      {
        id: 'p101-m4',
        code: 'M4',
        name: 'Resin pre-cure temperature testing',
        startDate: '2026-09-29',
        endDate: '2026-10-09',
        targetDate: '2026-10-09',
        actualDate: '2026-10-08',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'Completed',
      },
      {
        id: 'p101-m5',
        code: 'M5',
        name: 'Composite shell ultrasonic clearance & QA inspection',
        startDate: '2026-10-10',
        endDate: '2026-10-21',
        targetDate: '2026-10-21',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Delayed',
        lastProgressUpdate: '2026-10-18',
        delayRecord: {
          reason: 'Awaiting vendor clearance and calibrated probe replacement',
          correctiveAction: 'Follow-up call scheduled 22 Jul; expedited courier dispatched',
          supportFromHOD: 'Requested vendor escalation from HOD; awaiting response',
        },
      },
      {
        id: 'p101-m6',
        code: 'M6',
        name: 'Final dispatch packing and seal documentation',
        startDate: '2026-10-22',
        endDate: '2026-11-04',
        targetDate: '2026-11-04',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'Not started',
      },
    ],
  },

  // 2. P103 - Slipping (Overdue by 1 day: due Oct 23)
  {
    code: 'P103',
    name: 'Machining of 4 radomes',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p103-m1',
        code: 'M1',
        name: 'Billet preparation & rough machining',
        startDate: '2026-10-01',
        endDate: '2026-10-10',
        targetDate: '2026-10-10',
        actualDate: '2026-10-09',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Completed',
      },
      {
        id: 'p103-m2',
        code: 'M2',
        name: '5-axis CNC profile contouring',
        startDate: '2026-10-11',
        endDate: '2026-10-23',
        targetDate: '2026-10-23',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Delayed',
        lastProgressUpdate: '2026-10-19',
        delayRecord: {
          reason: 'Spindle vibration during finishing pass required recalibration',
          correctiveAction: 'Tool re-ground and balanced on test bench',
          supportFromHOD: 'Approval requested for additional machine hours',
        },
      },
      {
        id: 'p103-m3',
        code: 'M3',
        name: 'Surface finish roughness test and clean bench review',
        startDate: '2026-10-24',
        endDate: '2026-11-02',
        targetDate: '2026-11-02',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'In progress',
      },
    ],
  },

  // 3. P104 - Due in 2 days (due Oct 26)
  {
    code: 'P104',
    name: 'Assembly and inspection',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p104-m1',
        code: 'M1',
        name: 'Optical alignment fixture setup',
        startDate: '2026-10-12',
        endDate: '2026-10-19',
        targetDate: '2026-10-19',
        actualDate: '2026-10-19',
        durationCategory: 'Weekly',
        assignedTo: 'Bhavana',
        status: 'Completed',
      },
      {
        id: 'p104-m2',
        code: 'M2',
        name: 'Interconnect bonding & clamp torque inspection',
        startDate: '2026-10-20',
        endDate: '2026-10-26',
        targetDate: '2026-10-26',
        durationCategory: 'Weekly',
        assignedTo: 'Bhavana',
        status: 'In progress',
        lastProgressUpdate: '2026-10-20',
      },
      {
        id: 'p104-m3',
        code: 'M3',
        name: 'Hydrostatic leak & seal pressure decay testing',
        startDate: '2026-10-27',
        endDate: '2026-11-06',
        targetDate: '2026-11-06',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Not started',
      },
    ],
  },

  // 4. R101 - Due in 2 days (due Oct 26)
  {
    code: 'R101',
    name: 'R&D activity',
    type: 'R&D',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'r101-m1',
        code: 'M1',
        name: 'Baseline material micro-hardness characterization',
        startDate: '2026-10-05',
        endDate: '2026-10-15',
        targetDate: '2026-10-15',
        actualDate: '2026-10-14',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Completed',
      },
      {
        id: 'r101-m2',
        code: 'M2',
        name: 'High-frequency permittivity sample coupon testing',
        startDate: '2026-10-16',
        endDate: '2026-10-26',
        targetDate: '2026-10-26',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'In progress',
        lastProgressUpdate: '2026-10-21',
      },
      {
        id: 'r101-m3',
        code: 'M3',
        name: 'Syntactic foam dielectric batch verification',
        startDate: '2026-10-27',
        endDate: '2026-11-10',
        targetDate: '2026-11-10',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Not started',
      },
    ],
  },

  // 5. R102 - Due in 2 days (due Oct 26)
  {
    code: 'R102',
    name: 'Sensor telemetry & RF attenuation mapping',
    type: 'R&D',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'r102-m1',
        code: 'M1',
        name: 'Simulation model boundary meshing',
        startDate: '2026-10-08',
        endDate: '2026-10-17',
        targetDate: '2026-10-17',
        actualDate: '2026-10-16',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'Completed',
      },
      {
        id: 'r102-m2',
        code: 'M2',
        name: 'Anechoic chamber RF signal loss test',
        startDate: '2026-10-18',
        endDate: '2026-10-26',
        targetDate: '2026-10-26',
        durationCategory: 'Weekly',
        assignedTo: 'Bhavana',
        status: 'In progress',
        lastProgressUpdate: '2026-10-22',
      },
      {
        id: 'r102-m3',
        code: 'M3',
        name: 'Report compilation and telemetry cross-validation',
        startDate: '2026-10-27',
        endDate: '2026-11-05',
        targetDate: '2026-11-05',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'Not started',
      },
    ],
  },

  // 6. P102 - On track (due Oct 27)
  {
    code: 'P102',
    name: 'Radome composite fabrication batch 2',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p102-m1',
        code: 'M1',
        name: 'Tool preparation and vacuum bag leak test',
        startDate: '2026-10-15',
        endDate: '2026-10-21',
        targetDate: '2026-10-21',
        actualDate: '2026-10-20',
        durationCategory: 'Weekly',
        assignedTo: 'Dayasindhu',
        status: 'Completed',
      },
      {
        id: 'p102-m2',
        code: 'M2',
        name: 'Autoclave cure cycle execution & thermistor log',
        startDate: '2026-10-22',
        endDate: '2026-10-27',
        targetDate: '2026-10-27',
        durationCategory: 'Weekly',
        assignedTo: 'Dayasindhu',
        status: 'In progress',
        lastProgressUpdate: '2026-10-23',
      },
    ],
  },

  // 7. P105 - On track (due Oct 28)
  {
    code: 'P105',
    name: 'Gimbal mount casting QA',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p105-m1',
        code: 'M1',
        name: 'X-ray radiography inspection',
        startDate: '2026-10-20',
        endDate: '2026-10-28',
        targetDate: '2026-10-28',
        durationCategory: 'Weekly',
        assignedTo: 'Bhavana',
        status: 'In progress',
      },
    ],
  },

  // 8. P106 - On track (due Oct 31)
  {
    code: 'P106',
    name: 'Titanium fastening torque test',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p106-m1',
        code: 'M1',
        name: 'Shear stress validation',
        startDate: '2026-10-21',
        endDate: '2026-10-31',
        targetDate: '2026-10-31',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'In progress',
      },
    ],
  },

  // 9. R103 - On track (due Nov 03)
  {
    code: 'R103',
    name: 'Thermal chamber stress test',
    type: 'R&D',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'r103-m1',
        code: 'M1',
        name: '-40C to +85C cyclic temperature shock',
        startDate: '2026-10-22',
        endDate: '2026-11-03',
        targetDate: '2026-11-03',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'In progress',
      },
    ],
  },

  // 10. P107 - On track (due Nov 05)
  {
    code: 'P107',
    name: 'Waveguide flange gold plating audit',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p107-m1',
        code: 'M1',
        name: 'Micro-thickness eddy current reading',
        startDate: '2026-10-23',
        endDate: '2026-11-05',
        targetDate: '2026-11-05',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'In progress',
      },
    ],
  },

  // 11. P108 - On track (due Nov 07)
  {
    code: 'P108',
    name: 'Structural telemetry integration',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p108-m1',
        code: 'M1',
        name: 'Strain gauge calibration & DAQ interface',
        startDate: '2026-10-24',
        endDate: '2026-11-07',
        targetDate: '2026-11-07',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'In progress',
      },
    ],
  },

  // 12. P109 - On track (due Nov 10)
  {
    code: 'P109',
    name: 'Carbon-fiber skin trimming batch 4',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p109-m1',
        code: 'M1',
        name: 'Waterjet CNC perimeter profiling',
        startDate: '2026-10-25',
        endDate: '2026-11-10',
        targetDate: '2026-11-10',
        durationCategory: 'Fortnightly',
        assignedTo: 'Dayasindhu',
        status: 'Not started',
      },
    ],
  },

  // 13. P110 - On track (due Nov 12)
  {
    code: 'P110',
    name: 'Anodized collar assembly ring',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p110-m1',
        code: 'M1',
        name: 'Hard-anodize MIL-A-8625 Type III audit',
        startDate: '2026-10-26',
        endDate: '2026-11-12',
        targetDate: '2026-11-12',
        durationCategory: 'Fortnightly',
        assignedTo: 'Bhavana',
        status: 'Not started',
      },
    ],
  },

  // 14. P111 - On track (due Nov 15)
  {
    code: 'P111',
    name: 'Pressure bulkhead seal molding',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p111-m1',
        code: 'M1',
        name: 'Fluorosilicone compression cure',
        startDate: '2026-10-25',
        endDate: '2026-11-15',
        targetDate: '2026-11-15',
        durationCategory: 'Monthly',
        assignedTo: 'Dayasindhu',
        status: 'Not started',
      },
    ],
  },

  // 15. P112 - On track (due Nov 18)
  {
    code: 'P112',
    name: 'Optical window anti-reflective coating',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p112-m1',
        code: 'M1',
        name: 'Spectrophotometer transmittance test',
        startDate: '2026-10-27',
        endDate: '2026-11-18',
        targetDate: '2026-11-18',
        durationCategory: 'Monthly',
        assignedTo: 'Bhavana',
        status: 'Not started',
      },
    ],
  },

  // 16. P113 - On track (due Nov 22)
  {
    code: 'P113',
    name: 'Harness harness continuity and insulation check',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p113-m1',
        code: 'M1',
        name: 'Hi-pot dielectric withstand verification',
        startDate: '2026-10-28',
        endDate: '2026-11-22',
        targetDate: '2026-11-22',
        durationCategory: 'Monthly',
        assignedTo: 'Dayasindhu',
        status: 'Not started',
      },
    ],
  },

  // 17. P114 - On track (due Nov 25)
  {
    code: 'P114',
    name: 'Servo actuator vibration damping test',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p114-m1',
        code: 'M1',
        name: 'Sine sweep resonance identification',
        startDate: '2026-10-28',
        endDate: '2026-11-25',
        targetDate: '2026-11-25',
        durationCategory: 'Monthly',
        assignedTo: 'Bhavana',
        status: 'Not started',
      },
    ],
  },

  // 18. P201 - On track (due Nov 28)
  {
    code: 'P201',
    name: 'Antenna mast housing fabrication',
    type: 'Purchase order',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'p201-m1',
        code: 'M1',
        name: 'High-tensile spar welding',
        startDate: '2026-10-25',
        endDate: '2026-11-28',
        targetDate: '2026-11-28',
        durationCategory: 'Monthly',
        assignedTo: 'Dayasindhu',
        status: 'In progress',
      },
    ],
  },

  // 19. R104 - On track (due Dec 02)
  {
    code: 'R104',
    name: 'Metamaterial radar absorbing surface',
    type: 'R&D',
    projectManager: 'Divya Prakash Upadhyay',
    milestones: [
      {
        id: 'r104-m1',
        code: 'M1',
        name: 'Sub-wavelength periodic grid lithography',
        startDate: '2026-10-28',
        endDate: '2026-12-02',
        targetDate: '2026-12-02',
        durationCategory: 'Monthly',
        assignedTo: 'Bhavana',
        status: 'Not started',
      },
    ],
  },
];

/**
 * Returns overall project status based on milestones relative to SIMULATION_TODAY (24 Oct 2026)
 */
export function getProjectStatus(project: Project): ProjectStatus {
  // If any milestone is Delayed or overdue, project is Slipping
  const hasDelayed = project.milestones.some((m) => {
    if (m.status === 'Completed') return false;
    if (m.status === 'Delayed') return true;
    const daysLeft = getDaysRemaining(m.endDate);
    return daysLeft < 0;
  });

  if (hasDelayed) return 'Slipping';

  // If next pending milestone is due in 0..2 days (e.g. 26 Oct is 2 days away)
  const hasDueSoon = project.milestones.some((m) => {
    if (m.status === 'Completed') return false;
    const daysLeft = getDaysRemaining(m.endDate);
    return daysLeft >= 0 && daysLeft <= 2;
  });

  if (hasDueSoon) return 'Due in 2 days';

  return 'On track';
}

/**
 * Gets next critical deadline date and formatted text for a project
 */
export function getNextDeadlineInfo(project: Project): { date: string; formatted: string; label: string; daysRemaining: number } {
  // If slipping, find the overdue milestone
  const overdueMilestone = project.milestones.find((m) => {
    if (m.status === 'Completed') return false;
    return m.status === 'Delayed' || getDaysRemaining(m.endDate) < 0;
  });

  if (overdueMilestone) {
    const daysOverdue = Math.abs(getDaysRemaining(overdueMilestone.endDate));
    return {
      date: overdueMilestone.endDate,
      formatted: `Due ${formatDate(overdueMilestone.endDate, 'long')}`,
      label: `Overdue by ${daysOverdue} day${daysOverdue > 1 ? 's' : ''}`,
      daysRemaining: -daysOverdue,
    };
  }

  // Find earliest uncompleted milestone
  const pendingMilestones = project.milestones
    .filter((m) => m.status !== 'Completed')
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

  if (pendingMilestones.length > 0) {
    const nextM = pendingMilestones[0];
    const daysRemaining = getDaysRemaining(nextM.endDate);
    let label = `In ${daysRemaining} days`;
    if (daysRemaining === 0) label = 'Due today';
    if (daysRemaining === 1) label = 'In 1 day';
    if (daysRemaining === 2) label = 'In 2 days';

    return {
      date: nextM.endDate,
      formatted: `Due ${formatDate(nextM.endDate, 'long')}`,
      label,
      daysRemaining,
    };
  }

  // If all completed, return last milestone
  const lastM = project.milestones[project.milestones.length - 1];
  return {
    date: lastM?.endDate || '2026-10-24',
    formatted: `Completed`,
    label: 'All done',
    daysRemaining: 999,
  };
}

/**
 * Returns initial mock alerts for the beacon popup and alert history
 */
export function getInitialAlerts(): AlertItem[] {
  return [
    {
      id: 'alt-1',
      projectCode: 'P104',
      projectName: 'Assembly and inspection',
      milestoneId: 'p104-m2',
      milestoneCode: 'M2',
      milestoneName: 'Interconnect bonding & clamp torque inspection',
      assignedTo: 'Bhavana',
      alertType: 'due_soon',
      title: 'Deadline approaching',
      badgeText: '2 days remaining',
      subText: '2 days before · Oct 24',
      lastUpdateText: 'Progress not updated since Oct 20',
      dateText: 'Oct 24',
      isOverdue: false,
      isRead: false,
    },
    {
      id: 'alt-2',
      projectCode: 'P103',
      projectName: 'Machining of 4 radomes',
      milestoneId: 'p103-m2',
      milestoneCode: 'M2',
      milestoneName: '5-axis CNC profile contouring',
      assignedTo: 'Dayasindhu',
      alertType: 'overdue',
      title: 'Machining of 4 radomes',
      badgeText: 'Overdue by 1 day',
      subText: 'Overdue · Oct 23',
      lastUpdateText: 'Spindle vibration recalibration ongoing',
      dateText: 'Oct 23',
      isOverdue: true,
      isRead: false,
    },
    {
      id: 'alt-3',
      projectCode: 'P101',
      projectName: 'Clearance of 27 radome assembly',
      milestoneId: 'p101-m5',
      milestoneCode: 'M5',
      milestoneName: 'Composite shell ultrasonic clearance & QA inspection',
      assignedTo: 'Dayasindhu',
      alertType: 'overdue',
      title: 'Clearance of 27 radome assembly',
      badgeText: 'Overdue by 3 days',
      subText: 'Overdue · Oct 21',
      lastUpdateText: 'Awaiting vendor ultrasonic probe clearance',
      dateText: 'Oct 21',
      isOverdue: true,
      isRead: false,
    },
  ];
}
