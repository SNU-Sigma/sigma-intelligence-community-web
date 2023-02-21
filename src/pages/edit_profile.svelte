<script lang="ts">
    import type { ProfileDto } from '../lib/domain/profile/model/ProfileDto'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import { params } from '@roxi/routify'

    const name = String($params.name)
</script>
