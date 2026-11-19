const rawIdeas = [
  {
    id: 'meeting-recap', title: 'Automatic meeting recaps', category: 'Meeting follow-through', icon: '✦', color: 'purple',
    description: 'Create a concise recap with decisions and action items after a meeting, then make it easy to share.',
    groups: ['IT & operations', 'Sales teams'], confidence: 'high', confidenceReason: 'Three Webex messages describe this need directly; the request closely matches the Airtable idea.',
    airtableIds: ['IDEA-184'], votes: [v('V-801','acct-01','Nov 2'),v('V-802','acct-02','Nov 2'),v('V-803','acct-03','Nov 3'),v('V-804','acct-04','Nov 4'),v('V-805','acct-05','Nov 4')],
    messages: ['WX-2041','WX-2058','WX-2066'],
  },
  {
    id: 'meeting-summary', title: 'Shareable call summaries', category: 'Meeting follow-through', icon: '↗', color: 'blue',
    description: 'Give attendees a short meeting summary they can share with teammates who could not join.',
    groups: ['IT & operations', 'Hybrid teams'], confidence: 'medium', confidenceReason: 'The wording differs, but the Webex requests overlap with the recap idea. PM review is recommended before combining.',
    airtableIds: ['IDEA-233'], votes: [v('V-806','acct-03','Nov 2'),v('V-807','acct-06','Nov 3'),v('V-808','acct-07','Nov 4'),v('V-809','acct-08','Nov 4')],
    messages: ['WX-2041','WX-2072'],
  },
  {
    id: 'voicemail-transcript', title: 'Voicemail transcription in one view', category: 'Calling', icon: '▤', color: 'teal',
    description: 'Read voicemail transcripts alongside call history instead of opening each message individually.',
    groups: ['Contact centers', 'Sales teams'], confidence: 'high', confidenceReason: 'Two Webex messages explicitly mention reading transcripts from call history.',
    airtableIds: ['IDEA-091'], votes: [v('V-810','acct-09','Nov 2'),v('V-811','acct-10','Nov 2'),v('V-812','acct-11','Nov 3'),v('V-813','acct-12','Nov 3'),v('V-814','acct-13','Nov 4'),v('V-815','acct-14','Nov 4'),v('V-816','acct-09','Nov 4','Possible repeated vote record from the same account on this idea.')],
    messages: ['WX-2095','WX-2102'],
  },
  {
    id: 'guest-controls', title: 'Simpler guest access controls', category: 'Administration', icon: '⌘', color: 'orange',
    description: 'Manage guest permissions and meeting access from one clear set of controls.',
    groups: ['IT & operations'], confidence: 'medium', confidenceReason: 'The Webex messages describe related access-control friction, though the exact requested workflow varies.',
    airtableIds: ['IDEA-147'], votes: [v('V-817','acct-01','Nov 2'),v('V-818','acct-15','Nov 2'),v('V-819','acct-16','Nov 3'),v('V-820','acct-17','Nov 3'),v('V-821','acct-15','Nov 4','Possible repeated vote record from the same account on this idea.')],
    messages: ['WX-2144'],
  },
  {
    id: 'crm-sync', title: 'Two-way CRM contact sync', category: 'Integrations', icon: '⟳', color: 'pink',
    description: 'Keep contact details aligned between the CRM and the team’s calling workspace.',
    groups: ['Sales teams'], confidence: 'high', confidenceReason: 'The source messages and Airtable idea both request less manual contact maintenance.',
    airtableIds: ['IDEA-172'], votes: [v('V-822','acct-19','Nov 2'),v('V-823','acct-20','Nov 3'),v('V-824','acct-21','Nov 3'),v('V-825','acct-22','Nov 4')],
    messages: ['WX-2160'],
  },
  {
    id: 'device-handoff', title: 'Move a call between devices', category: 'Calling', icon: '⇄', color: 'green',
    description: 'Move an active call from desktop to mobile without asking the other person to call back.',
    groups: ['Hybrid teams'], confidence: 'medium', confidenceReason: 'The message supports a device-handoff need, but does not specify the full requested behavior.',
    airtableIds: ['IDEA-204'], votes: [v('V-826','acct-23','Nov 3'),v('V-827','acct-24','Nov 3'),v('V-828','acct-25','Nov 4')],
    messages: ['WX-2188'],
  },
  {
    id: 'usage-export', title: 'Export product usage by team', category: 'Analytics', icon: '▥', color: 'blue',
    description: 'Download a team-level usage report for internal adoption reviews.',
    groups: ['IT & operations'], confidence: 'low', confidenceReason: 'One Webex message mentions reporting friction, but it may not map to this exact export request.',
    airtableIds: ['IDEA-219'], votes: [v('V-829','acct-26','Nov 3'),v('V-830','acct-27','Nov 4')],
    messages: ['WX-2214'],
  },
];

function v(id, account, date, flag = '') { return { id, account, date, flag, reviewed: false }; }

const messages = {
  'WX-2041': { date: 'Nov 2, 2026', channel: '#weekly-customer-signals', author: 'Customer success · fictional', text: 'After a long call, the team spends time rewriting what we agreed on. A short recap with decisions would help us move faster.' },
  'WX-2058': { date: 'Nov 3, 2026', channel: '#enterprise-feedback', author: 'Account team · fictional', text: 'Could we get the meeting recap and action items in one place? We currently send a follow-up note manually.' },
  'WX-2066': { date: 'Nov 4, 2026', channel: '#pm-customer-notes', author: 'Research notes · fictional', text: 'Several attendees asked for a quick way to find the decisions made in their customer calls.' },
  'WX-2072': { date: 'Nov 3, 2026', channel: '#field-notes', author: 'Customer success · fictional', text: 'People who missed the call ask the host to forward notes afterward.' },
  'WX-2095': { date: 'Nov 2, 2026', channel: '#calling-feedback', author: 'Support themes · fictional', text: 'Agents want to scan a voicemail transcript from call history without opening the recording first.' },
  'WX-2102': { date: 'Nov 4, 2026', channel: '#contact-center-pm', author: 'PM research notes · fictional', text: 'Reading each voicemail one at a time slows down the callback workflow.' },
  'WX-2144': { date: 'Nov 3, 2026', channel: '#admin-experience', author: 'Customer success · fictional', text: 'Guest access settings are spread across a few places; admins want to confirm permissions before the meeting.' },
  'WX-2160': { date: 'Nov 2, 2026', channel: '#sales-workflows', author: 'Field feedback · fictional', text: 'The team updates the same customer contact in two systems and sometimes finds conflicting details.' },
  'WX-2188': { date: 'Nov 4, 2026', channel: '#hybrid-work', author: 'Customer interview · fictional', text: 'I start calls on my laptop, but when I leave my desk I have to call back from my phone.' },
  'WX-2214': { date: 'Nov 4, 2026', channel: '#product-ops', author: 'PM discussion · fictional', text: 'It takes a few manual steps to gather usage data for our team adoption check-in.' },
};

let mergeState = 'suggested'; // suggested | merged | separate
let activeListFilter = 'all';
let searchTerm = '';
let selectedSegment = 'all';
let sortDirection = 'desc';
let selectedIdeaId = null;
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function uniqueAccounts(idea) { return [...new Set(idea.votes.map(vote => vote.account))]; }
function openFlags(idea) { return idea.votes.filter(vote => vote.flag && !vote.reviewed); }
function allVoteRows() { return rawIdeas.flatMap(idea => idea.votes); }
function overallUniqueAccounts() { return new Set(allVoteRows().map(vote => vote.account)).size; }
function activeIdeas() {
  if (mergeState !== 'merged') return rawIdeas.map(idea => ({ ...idea, merged: false, sourceRecords: idea.airtableIds }));
  const first = rawIdeas.find(idea => idea.id === 'meeting-recap');
  const second = rawIdeas.find(idea => idea.id === 'meeting-summary');
  return rawIdeas.filter(idea => !['meeting-recap','meeting-summary'].includes(idea.id)).concat([{
    ...first,
    id: 'meeting-recap-merged',
    title: 'Automatic meeting recaps & shareable summaries',
    description: 'Create a concise recap with decisions and action items, then make it easy to share with teammates who missed the meeting.',
    groups: [...new Set([...first.groups, ...second.groups])],
    confidence: 'high', confidenceReason: 'The PM confirmed the two Airtable records describe one combined idea. Supporting Webex messages remain linked for review.',
    airtableIds: [...first.airtableIds, ...second.airtableIds],
    votes: [...first.votes, ...second.votes],
    messages: [...new Set([...first.messages, ...second.messages])],
    merged: true, sourceRecords: [...first.airtableIds, ...second.airtableIds],
  }]);
}
function supportCount(idea) { return uniqueAccounts(idea).length; }
function filteredIdeas() {
  let list = activeIdeas().filter(idea => {
    if (activeListFilter === 'duplicate' && !(mergeState === 'suggested' && ['meeting-recap','meeting-summary'].includes(idea.id))) return false;
    if (activeListFilter === 'review' && !openFlags(idea).length) return false;
    if (selectedSegment !== 'all' && !idea.groups.includes(selectedSegment)) return false;
    if (searchTerm) {
      const haystack = [idea.title,idea.category,idea.description,...idea.groups].join(' ').toLowerCase();
      if (!haystack.includes(searchTerm.toLowerCase())) return false;
    }
    return true;
  });
  list.sort((a,b) => sortDirection === 'desc' ? supportCount(b)-supportCount(a) : supportCount(a)-supportCount(b));
  return list;
}
function displayIdeaCount() { return activeIdeas().length; }
function reviewCount() { return rawIdeas.reduce((count,idea) => count + openFlags(idea).length, 0); }
function duplicateCount() { return mergeState === 'suggested' ? 1 : 0; }
function avatarInitial(account) { return account.replace('acct-','').slice(-2); }
function escapeHtml(text) { return String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }

function updateCounts() {
  $('#webex-source-count').textContent = `${Object.keys(messages).length} messages`;
  $('#airtable-source-count').textContent = `${rawIdeas.length + (mergeState === 'merged' ? 0 : 0)} ideas · ${allVoteRows().length} vote records`;
  $('#idea-total').textContent = displayIdeaCount();
  $('#supporter-total').textContent = overallUniqueAccounts();
  $('#review-total').textContent = reviewCount();
  $('#review-nav-count').textContent = reviewCount();
  $('#review-nav-count').classList.toggle('hidden', reviewCount() === 0);
  $('#duplicate-nav-count').textContent = duplicateCount();
  $('#duplicate-nav-count').classList.toggle('hidden', duplicateCount() === 0);
  $('#all-count').textContent = displayIdeaCount();
  $('#dup-count').textContent = duplicateCount();
  $('#flag-count').textContent = reviewCount();
  $('#lead-ideas').textContent = displayIdeaCount();
  $('#lead-supporters').textContent = overallUniqueAccounts();
  $('#lead-flags').textContent = reviewCount();
}

function renderTable() {
  updateCounts();
  const rows = filteredIdeas();
  $('#ideas-body').innerHTML = rows.map((idea,index) => {
    const duplicateSuggested = mergeState === 'suggested' && ['meeting-recap','meeting-summary'].includes(idea.id);
    const flags = openFlags(idea);
    const reviewedFlags = idea.votes.filter(vote => vote.flag && vote.reviewed);
    const tagHtml = [duplicateSuggested ? '<span class="tag duplicate">⧉ Suggested duplicate</span>' : '',flags.length ? `<span class="tag flag">⚑ ${flags.length} to review</span>` : '',!flags.length && reviewedFlags.length ? '<span class="tag reviewed">✓ Reviewed</span>' : '',idea.merged ? '<span class="tag duplicate">⧉ Merged group</span>' : ''].filter(Boolean).join('');
    const avatars = uniqueAccounts(idea).slice(0,3).map(account => `<span class="mini-avatar" title="Fictional voter ${escapeHtml(account)}">${avatarInitial(account)}</span>`).join('');
    const groups = idea.groups.slice(0,2).map(group => `<span class="group-chip">${escapeHtml(group)}</span>`).join('');
    return `<tr tabindex="0" role="button" aria-label="Open ${escapeHtml(idea.title)} details" data-open-idea="${idea.id}">
      <td><span class="rank-number ${index<3?'top':''}">${String(index+1).padStart(2,'0')}</span></td>
      <td><div class="idea-cell"><span class="idea-icon ${idea.color}">${idea.icon}</span><span class="idea-text"><strong>${escapeHtml(idea.title)}</strong><span class="idea-subtitle">${escapeHtml(idea.category)}</span><span class="idea-tags">${tagHtml}</span></span></div></td>
      <td><div class="support-cell"><span class="support-num">${supportCount(idea)}</span><span class="support-label">supporters</span><span class="mini-avatars">${avatars}</span></div></td>
      <td><div class="group-list">${groups}</div></td>
      <td><div class="confidence ${idea.confidence}"><i class="confidence-dot"></i>${idea.confidence[0].toUpperCase()+idea.confidence.slice(1)}</div><div class="match-detail">${idea.messages.length} linked messages</div></td>
      <td class="review-cell">${flags.length ? `<span class="tag flag">⚑ Review</span>` : reviewedFlags.length ? `<span class="tag reviewed">✓ Done</span>` : '<span class="idea-subtitle">—</span>'}</td>
      <td><button class="more-button" type="button" aria-label="Open idea details">···</button></td>
    </tr>`;
  }).join('');
  $('#empty-state').classList.toggle('hidden', rows.length > 0);
  $('#ideas-body').classList.toggle('hidden', rows.length === 0);
  const activeFilters = (activeListFilter !== 'all' ? 1 : 0) + (selectedSegment !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0);
  $('#filter-count').textContent = activeFilters ? activeFilters : '';
  if (selectedIdeaId && !activeIdeas().some(idea => idea.id === selectedIdeaId)) selectedIdeaId = activeIdeas()[0]?.id;
}

function renderLeadership() {
  updateCounts();
  const list = activeIdeas().sort((a,b) => supportCount(b)-supportCount(a));
  $('#leadership-list').innerHTML = list.map((idea,index) => {
    const duplicateSuggested = mergeState === 'suggested' && ['meeting-recap','meeting-summary'].includes(idea.id);
    const flags = openFlags(idea).length;
    const message = idea.messages.map(id => messages[id]).find(Boolean);
    return `<article class="lead-idea-card" tabindex="0" role="button" data-open-idea="${idea.id}"><span class="rank-number ${index<3?'top':''}">${String(index+1).padStart(2,'0')}</span><div class="lead-idea-main"><h3>${escapeHtml(idea.title)} ${duplicateSuggested ? '<span class="tag duplicate">⧉ Possible duplicate</span>' : ''}</h3><p>${escapeHtml(idea.description)}</p><div class="lead-evidence-line"><span>${escapeHtml(idea.groups.join(' · '))}</span><span>·</span><span>${idea.messages.length} Webex message${idea.messages.length===1?'':'s'}</span><span>·</span><span class="confidence ${idea.confidence}"><i class="confidence-dot"></i>${idea.confidence} match</span>${flags?`<span class="tag flag">${flags} vote flag${flags===1?'':'s'}</span>`:''}</div>${message?`<p class="lead-quote">“${escapeHtml(message.text.slice(0,105))}${message.text.length>105?'…':''}” <span>— ${escapeHtml(message.channel)}</span></p>`:''}</div><div class="lead-vote-count"><strong>${supportCount(idea)}</strong><span>distinct supporters</span></div></article>`;
  }).join('');
}

function lookupIdea(id) {
  if (id === 'meeting-recap-merged') return activeIdeas().find(idea => idea.id === id);
  return activeIdeas().find(idea => idea.id === id) || rawIdeas.find(idea => idea.id === id);
}
function renderDrawer(id) {
  const idea = lookupIdea(id);
  if (!idea) return;
  selectedIdeaId = id;
  const duplicateSuggested = mergeState === 'suggested' && ['meeting-recap','meeting-summary'].includes(id);
  const pair = rawIdeas.filter(item => ['meeting-recap','meeting-summary'].includes(item.id));
  const votes = idea.votes;
  const unique = uniqueAccounts(idea);
  const flaggedVotes = votes.filter(vote => vote.flag);
  const linkedMessages = idea.messages.map(messageId => ({id:messageId,...messages[messageId]})).filter(message => message.date);
  const ideaRows = idea.airtableIds.map(airtableId => rawIdeas.find(item => item.airtableIds.includes(airtableId))).filter(Boolean);
  const headerTag = duplicateSuggested ? '<span class="tag duplicate">⧉ Duplicate match suggested</span>' : idea.merged ? '<span class="tag duplicate">⧉ PM-confirmed merged group</span>' : '';
  $('#drawer-kicker').textContent = `${idea.category.toUpperCase()} · IDEA DETAILS`;
  $('#drawer-content').innerHTML = `
    <h2 id="drawer-title">${escapeHtml(idea.title)}</h2>
    <p class="drawer-desc">${escapeHtml(idea.description)}</p>
    <div class="drawer-badges">${headerTag}<span class="confidence ${idea.confidence}"><i class="confidence-dot"></i>${idea.confidence[0].toUpperCase()+idea.confidence.slice(1)} Webex match</span>${idea.groups.map(group=>`<span class="group-chip">${escapeHtml(group)}</span>`).join('')}</div>
    <div class="drawer-stat-row"><div class="drawer-stat"><span>DISTINCT SUPPORTERS</span><strong>${unique.length}</strong><small>${votes.length} Airtable vote records · duplicates count once</small></div><div class="drawer-stat"><span>WEBEX EVIDENCE</span><strong>${linkedMessages.length}</strong><small>Messages matched to this idea</small></div></div>
    <section class="drawer-section"><div class="drawer-section-heading"><h3>Airtable idea records</h3><span>${idea.airtableIds.join(' · ')}</span></div><div class="voter-list">${unique.map(account=>`<span class="voter-chip"><i>${avatarInitial(account)}</i>${escapeHtml(account)}</span>`).join('')}</div><div class="confidence-explanation">${escapeHtml(idea.confidenceReason)}</div></section>
    ${duplicateSuggested ? `<section class="drawer-section"><div class="drawer-section-heading"><h3>Possible duplicate ideas</h3><span>PM decision needed</span></div><div class="duplicate-box"><p>These Airtable requests may describe the same customer need. Compare the original records before deciding whether to combine their support.</p>${pair.map(item=>`<div class="duplicate-item"><i>▦</i><span><strong>${escapeHtml(item.title)}</strong><small>${item.airtableIds.join(' · ')} · ${uniqueAccounts(item).length} distinct supporters</small></span></div>`).join('')}<div class="drawer-actions"><button type="button" data-action="keep-separate">Keep separate</button><button class="confirm" type="button" data-action="confirm-merge">Confirm merge</button></div></div></section>` : ''}
    ${idea.merged ? `<section class="drawer-section"><div class="drawer-section-heading"><h3>Merge decision</h3><span>Confirmed in this prototype</span></div><div class="duplicate-box"><p>${idea.airtableIds.length} source ideas are grouped here. Distinct support is calculated from the union of voter accounts, so a person who voted on both records counts once for this merged idea.</p><div class="drawer-actions"><button type="button" data-action="undo-merge">Undo merge</button></div></div></section>` : ''}
    <section class="drawer-section"><div class="drawer-section-heading"><h3>Supporting Webex messages</h3><span>${linkedMessages.length} records · evidence, not votes</span></div>${linkedMessages.map(message=>`<article class="source-record"><div class="source-record-top"><span class="source-id">${message.id}</span><span class="source-kind">Webex message</span></div><p>${escapeHtml(message.text)}</p><div class="source-record-foot"><span>${escapeHtml(message.channel)} · ${message.date}</span><span>${escapeHtml(message.author)}</span></div></article>`).join('')}</section>
    ${flaggedVotes.length ? `<section class="drawer-section"><div class="drawer-section-heading"><h3>Vote records to review</h3><span>${flaggedVotes.filter(vote=>!vote.reviewed).length} open</span></div>${flaggedVotes.map(vote=>`<div class="vote-alert"><div class="source-record-top"><span class="source-id">${vote.id} · ${escapeHtml(vote.account)}</span><span class="tag ${vote.reviewed?'reviewed':'flag'}">${vote.reviewed?'✓ Reviewed':'⚑ Possible duplicate'}</span></div><p>${escapeHtml(vote.flag)} It remains visible, and this account is counted once for the idea.</p><div class="source-record-foot"><span>Airtable vote · ${vote.date}, 2026</span><button type="button" class="review-action ${vote.reviewed?'done':''}" data-action="${vote.reviewed?'unreview':'review'}" data-vote-id="${vote.id}">${vote.reviewed?'Undo review':'Mark reviewed'}</button></div></div>`).join('')}</section>` : ''}
    <div class="drawer-footer-note">Juno provides linked evidence and analysis. You make the product decision. All people and records in this prototype are fictional.</div>`;
  $('#drawer-backdrop').classList.remove('hidden');
  $('#detail-drawer').classList.remove('hidden');
  document.body.classList.add('drawer-open');
  $('#drawer-close').focus();
}
function closeDrawer() {
  $('#drawer-backdrop').classList.add('hidden');
  $('#detail-drawer').classList.add('hidden');
  document.body.classList.remove('drawer-open');
}
function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove('show'),2400);
}
function setView(view) {
  const leadership = view === 'leadership';
  $('#overview-view').classList.toggle('hidden',leadership);
  $('#leadership-view').classList.toggle('hidden',!leadership);
  $('#breadcrumb-current').textContent = leadership ? 'Leadership summary' : 'Weekly brief';
  $$('.nav-item[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
  if (leadership) renderLeadership();
  window.scrollTo({top:0,behavior:'smooth'});
}
function applyListFilter(filter) {
  activeListFilter = filter;
  $$('.filter-pill').forEach(button=>button.classList.toggle('active',button.dataset.listFilter===filter));
  renderTable();
}

document.addEventListener('click',event=>{
  const viewButton = event.target.closest('[data-view]');
  if (viewButton) { setView(viewButton.dataset.view); return; }
  const filterLink = event.target.closest('[data-filter]');
  if (filterLink) { setView('overview'); applyListFilter(filterLink.dataset.filter); $('#filter-row').scrollIntoView({behavior:'smooth',block:'nearest'}); return; }
  const listFilter = event.target.closest('[data-list-filter]');
  if (listFilter) { applyListFilter(listFilter.dataset.listFilter); return; }
  const openButton = event.target.closest('[data-open-idea]');
  if (openButton && !event.target.closest('[data-action]')) { renderDrawer(openButton.dataset.openIdea); return; }
  const action = event.target.closest('[data-action]');
  if (action) {
    const name = action.dataset.action;
    if (name === 'confirm-merge') { mergeState='merged'; selectedIdeaId='meeting-recap-merged'; renderTable(); renderLeadership(); renderDrawer('meeting-recap-merged'); showToast('Duplicate ideas merged. Support counts now use distinct accounts.'); }
    if (name === 'keep-separate') { mergeState='separate'; renderTable(); renderLeadership(); renderDrawer(selectedIdeaId); showToast('Ideas will remain separate in this brief.'); }
    if (name === 'undo-merge') { mergeState='separate'; renderTable(); renderLeadership(); renderDrawer('meeting-recap'); showToast('Merged grouping undone for this prototype.'); }
    if (name === 'review' || name === 'unreview') {
      for (const idea of rawIdeas) { const vote=idea.votes.find(item=>item.id===action.dataset.voteId); if(vote){vote.reviewed=name==='review';break;} }
      renderTable(); renderLeadership(); renderDrawer(selectedIdeaId); showToast(name==='review'?'Vote record marked reviewed.':'Review status restored.');
    }
    return;
  }
  if (event.target.closest('#open-leadership')) { setView('leadership'); return; }
  if (event.target.closest('#back-to-brief')) { setView('overview'); return; }
  if (event.target.closest('#drawer-close') || event.target === $('#drawer-backdrop')) { closeDrawer(); return; }
  if (event.target.closest('#filter-button')) { $('#filter-row').classList.toggle('hidden'); return; }
  if (event.target.closest('#sort-button')) { sortDirection=sortDirection==='desc'?'asc':'desc'; $('#sort-button').innerHTML=`<span>↕</span> ${sortDirection==='desc'?'Most supporters':'Fewest supporters'} <span class="chevron">⌄</span>`; renderTable(); return; }
  if (event.target.closest('#clear-filters')) { searchTerm='';selectedSegment='all';$('#search-input').value='';$('#segment-select').value='all';applyListFilter('all');return; }
  if (event.target.closest('#count-help')) { showToast('Each Airtable account counts once per idea. Webex messages add context, not votes.'); return; }
  if (event.target.closest('#open-workflow-idea')) { setView('overview');renderDrawer('meeting-recap');return; }
  if (event.target.closest('#drawer-prev') || event.target.closest('#drawer-next')) {
    const list=filteredIdeas(); if(!list.length)return; const index=list.findIndex(item=>item.id===selectedIdeaId); const dir=event.target.closest('#drawer-next')?1:-1; renderDrawer(list[(index+dir+list.length)%list.length].id); return;
  }
});

$('#search-input').addEventListener('input',event=>{searchTerm=event.target.value.trim();renderTable();});
$('#segment-select').addEventListener('change',event=>{selectedSegment=event.target.value;renderTable();});
$('#ideas-body').addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-open-idea]')){event.preventDefault();renderDrawer(event.target.dataset.openIdea);}});
$('#leadership-list').addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-open-idea]')){event.preventDefault();renderDrawer(event.target.dataset.openIdea);}});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!$('#detail-drawer').classList.contains('hidden'))closeDrawer();
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if($('#overview-view').classList.contains('hidden'))setView('overview');$('#filter-row').classList.remove('hidden');$('#search-input').focus();}
});

renderTable();
