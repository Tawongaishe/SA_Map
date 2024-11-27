"""added in separate backref for mentor_needs

Revision ID: fcc826fb8067
Revises: 98f9b0472f98
Create Date: 2024-11-21 17:35:34.795144

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fcc826fb8067'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mentor_needs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('needs_id', sa.Integer(), nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'expertise', ['needs_id'], ['id'])
        batch_op.drop_column('expertise_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mentor_needs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('expertise_id', sa.INTEGER(), nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'expertise', ['expertise_id'], ['id'])
        batch_op.drop_column('needs_id')

    # ### end Alembic commands ###