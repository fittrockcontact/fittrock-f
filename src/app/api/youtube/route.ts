import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const CHANNEL_ID = 'UCVu2tmVCzqK8F4yiUwFjSWQ'; // @FITTROCK channel ID

  const allShorts = [
    {
      id: 'ZjxVxJks2so',
      title: 'This Standing Desk Looks PREMIUM 💼⚡',
      thumbnail: 'https://i.ytimg.com/vi/ZjxVxJks2so/hqdefault.jpg',
      views: '1.2K views',
      type: 'short',
    },
    {
      id: '8tRBbeB45qk',
      title: 'Rati Single Motor But SUPER Smooth ⚡😱 @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/8tRBbeB45qk/hqdefault.jpg',
      views: '2.4K views',
      type: 'short',
    },
    {
      id: 'law7ZaQqPGg',
      title: 'RATI Single Motor = Productivity Boost @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/law7ZaQqPGg/hqdefault.jpg',
      views: '1.8K views',
      type: 'short',
    },
    {
      id: 'HdCK_mcsw0U',
      title: 'From AM to PM Without Back Pain @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/HdCK_mcsw0U/hqdefault.jpg',
      views: '3.1K views',
      type: 'short',
    },
    {
      id: '0XE_UlfLVc0',
      title: 'Dual Motor Power 😳🔥 | Kuber Desk by @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/0XE_UlfLVc0/hqdefault.jpg',
      views: '4.5K views',
      type: 'short',
    },
    {
      id: '2Srn48EX9FM',
      title: 'India’s Most Flexible Desk? 🔥 | Yogeek Floor to Standing Setup',
      thumbnail: 'https://i.ytimg.com/vi/2Srn48EX9FM/hqdefault.jpg',
      views: '5.2K views',
      type: 'short',
    },
    {
      id: '8UDj4KClbgA',
      title: 'Floor to Standing in Seconds 😳🔥 | Yogeek Desk by @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/8UDj4KClbgA/hqdefault.jpg',
      views: '2.9K views',
      type: 'short',
    },
    {
      id: 'U8ALhboHBTA',
      title: '₹17K Desk That FIXES Your Back 😳🔥',
      thumbnail: 'https://i.ytimg.com/vi/U8ALhboHBTA/hqdefault.jpg',
      views: '6.7K views',
      type: 'short',
    },
    {
      id: '_7Hm0oH_TrI',
      title: 'Don’t Buy a Desk Before Watching This 😱 | Yogeek by Fittrock',
      thumbnail: 'https://i.ytimg.com/vi/_7Hm0oH_TrI/hqdefault.jpg',
      views: '3.8K views',
      type: 'short',
    },
    {
      id: 'ZhvjQjAS6cI',
      title: 'Electric Height Adjustable Standing Desk | @fittrock',
      thumbnail: 'https://i.ytimg.com/vi/ZhvjQjAS6cI/hqdefault.jpg',
      views: '4.1K views',
      type: 'short',
    },
    {
      id: 'zGXRfvsNAtk',
      title: 'Game-Changer for WFH Setup! FITTROCK 😍',
      thumbnail: 'https://i.ytimg.com/vi/zGXRfvsNAtk/hqdefault.jpg',
      views: '2.3K views',
      type: 'short',
    },
    {
      id: '2WlSpOy0DeY',
      title: 'Turn Your Work Into Comfort! #FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/2WlSpOy0DeY/hqdefault.jpg',
      views: '1.9K views',
      type: 'short',
    },
    {
      id: 'f4gJUHlST88',
      title: 'FITTROCK Future of Ergonomics',
      thumbnail: 'https://i.ytimg.com/vi/f4gJUHlST88/hqdefault.jpg',
      views: '2.1K views',
      type: 'short',
    },
  ];

  const allVideos = [
    {
      id: '1TA8liAn65o',
      title: 'Why FittRock Standing Desk is Best in the Market | 2026 | Premium',
      thumbnail: 'https://i.ytimg.com/vi/1TA8liAn65o/hqdefault.jpg',
      duration: '1:27',
      views: '5.2K views',
      type: 'video',
    },
    {
      id: 'a9StXdhUPFc',
      title: 'RATI Desk = Next Level Productivity 🚀 @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/a9StXdhUPFc/hqdefault.jpg',
      duration: '1:15',
      views: '8.4K views',
      type: 'video',
    },
    {
      id: 'uZgrLFYURzA',
      title: 'Yogeek - A true sit to standing desk By Fittrock',
      thumbnail: 'https://i.ytimg.com/vi/uZgrLFYURzA/hqdefault.jpg',
      duration: '2:10',
      views: '3.9K views',
      type: 'video',
    },
    {
      id: '89dikLl3rVI',
      title: 'Yogeek - A true sit to standing desk By Fittrock Overview',
      thumbnail: 'https://i.ytimg.com/vi/89dikLl3rVI/hqdefault.jpg',
      duration: '1:50',
      views: '4.2K views',
      type: 'video',
    },
    {
      id: 'mMZ-nTriKPg',
      title: 'Height Adjustable Desk | Assembly (Dual Motor) - Fittrock',
      thumbnail: 'https://i.ytimg.com/vi/mMZ-nTriKPg/hqdefault.jpg',
      duration: '8:45',
      views: '12K views',
      type: 'video',
    },
    {
      id: 'ahizMScrct0',
      title: 'FITTROCK Brand Shoot 2025 | Premium Standing Desks | Behind the Scenes',
      thumbnail: 'https://i.ytimg.com/vi/ahizMScrct0/hqdefault.jpg',
      duration: '3:20',
      views: '9.8K views',
      type: 'video',
    },
  ];

  return NextResponse.json({
    success: true,
    channel: '@FITTROCK',
    channelId: CHANNEL_ID,
    shorts: allShorts,
    videos: allVideos,
  });
}
