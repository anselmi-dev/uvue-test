<template>
    <div>
  		<div class="account-content__title">
  			<span class="line-height mb-0">Mi agenda</span> <br>
            <small class="text-muted">Próximos Eventos</small>
  		</div>
        <blockLabels />
        
        <calendar />

        <modalObservations />
    </div>
</template>

<script>
import blockLabels from '@/components/diary/blockLabels'
import calendar from '@/components/diary/calendar'
import modalObservations from '@/components/account/classes/modalObservations'

export default {
    components: {
        blockLabels,
        calendar,
        modalObservations
    }    
}
</script>